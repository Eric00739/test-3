'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Check, AlertCircle, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export interface RfqModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (result: {
    status: 'success' | 'error' | 'whatsapp';
    message?: string;
    data?: any;
  }) => void;
  onDownloadTemplate: () => void;
  source?: string;
}

// 常见国家列表
const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 
  'Canada', 'Australia', 'Japan', 'South Korea', 'China', 'India', 
  'Brazil', 'Mexico', 'Netherlands', 'Belgium', 'Switzerland', 'Austria',
  'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic',
  'Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'Philippines', 'Vietnam',
  'South Africa', 'Egypt', 'Israel', 'Turkey', 'Russia', 'Ukraine'
];

export function RfqModal({ open, onClose, onSubmit, onDownloadTemplate, source = 'default' }: RfqModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // 从localStorage恢复用户信息
  useEffect(() => {
    if (open) {
      const savedEmail = localStorage.getItem('rfq_email');
      const savedName = localStorage.getItem('rfq_name');
      if (savedEmail) setEmail(savedEmail);
      if (savedName) setName(savedName);
      
      // 自动聚焦邮箱输入框
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  }, [open]);

  // 保存用户信息到localStorage
  useEffect(() => {
    if (email) localStorage.setItem('rfq_email', email);
    if (name) localStorage.setItem('rfq_name', name);
  }, [email, name]);

  // 从邮箱自动提取姓名
  const extractNameFromEmail = (email: string) => {
    if (!email || !email.includes('@')) return '';
    const localPart = email.split('@')[0];
    return localPart
      .replace(/[._-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // 验证邮箱
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 处理邮箱输入
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError('');
    
    // 当用户输入@符号时，自动填充姓名
    if (value.includes('@') && !name) {
      const suggestedName = extractNameFromEmail(value);
      if (suggestedName && suggestedName.length > 2) {
        setName(suggestedName);
      }
    }
  };

  // 处理姓名输入
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) setNameError('');
  };

  // 处理国家输入
  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountry(value);
    const filtered = COUNTRIES.filter(c => 
      c.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
    setShowCountryDropdown(true);
  };

  // 选择国家
  const selectCountry = (countryName: string) => {
    setCountry(countryName);
    setShowCountryDropdown(false);
  };

  // 处理Enter键
  const handleKeyDown = (e: React.KeyboardEvent, field: 'email' | 'name' | 'country') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (field === 'email') {
        if (validateEmail(email)) {
          nameInputRef.current?.focus();
        } else {
          setEmailError('Enter a valid email.');
        }
      } else if (field === 'name') {
        if (name.trim()) {
          countryInputRef.current?.focus();
        } else {
          setNameError('Please add your name.');
        }
      } else {
        handleSubmit();
      }
    }
  };

  // 提交表单
  const handleSubmit = async () => {
    // 防止重复提交（8秒内只能提交一次）
    const now = Date.now();
    if (now - lastSubmitTime < 8000) return;
    
    // 清除之前的错误
    setSubmitError('');
    
    // 验证必填字段
    let hasError = false;
    if (!validateEmail(email)) {
      setEmailError('Enter a valid email.');
      hasError = true;
    }
    if (!name.trim()) {
      setNameError('Please add your name.');
      hasError = true;
    }
    
    if (hasError) return;
    
    // 检查honeypot字段（防止垃圾邮件）
    if (honeypotRef.current?.value) return;
    
    // 记录提交时间
    setLastSubmitTime(now);
    
    // 设置提交状态
    setIsSubmitting(true);
    
    try {
      // 构建FormData
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      if (country.trim()) {
        formData.append('country', country.trim());
      }
      if (message.trim()) {
        formData.append('message', message.trim());
      }
      formData.append('source', source);
      
      // 添加附件
      attachedFiles.forEach((file) => {
        formData.append('attachments', file);
      });
      
      // 发送请求到API
      const response = await fetch('/api/rfq', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // 成功提交
        setIsSubmitted(true);
        
        // 延迟关闭弹窗并通知父组件
        setTimeout(() => {
          onSubmit({
            status: 'success',
            message: 'RFQ submitted successfully',
            data: { email, name }
          });
          onClose();
          setIsSubmitted(false);
          setIsSubmitting(false);
        }, 2000);
      } else {
        // 提交失败
        const errorMessage = result.error || 'Failed to submit RFQ. Please try again.';
        setSubmitError(errorMessage);
        setIsSubmitting(false);
        
        // 通知父组件错误状态
        onSubmit({
          status: 'error',
          message: errorMessage,
          data: { email, name }
        });
      }
    } catch (error) {
      console.error('RFQ submission error:', error);
      const errorMessage = 'Network error. Please try again or use WhatsApp.';
      setSubmitError(errorMessage);
      setIsSubmitting(false);
      
      // 通知父组件错误状态
      onSubmit({
        status: 'error',
        message: errorMessage,
        data: { email, name }
      });
    }
  };

  // 重置表单
  const resetForm = () => {
    setEmail('');
    setName('');
    setCountry('');
    setMessage('');
    setAttachedFiles([]);
    setEmailError('');
    setNameError('');
    setShowCountryDropdown(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError('');
  };

  // 关闭弹窗时重置
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  // 条件渲染而不是使用AnimatePresence
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.button
        type="button"
        className="absolute inset-0 bg-slate-900/70"
        onClick={onClose}
        aria-label="Close RFQ overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Request a custom quotation"
        className="relative z-10 w-full max-w-lg sm:max-w-xl rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto"
        style={{ maxHeight: '700px' }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {/* 成功状态 */}
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              RFQ Sent Successfully!
            </h3>
            <p className="text-base text-slate-600 mb-4">
              Thank you for your inquiry. Our engineering team will review your requirements and respond within 12 hours.
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800 font-medium">
                Next: Check your email for confirmation. You can reply directly with additional files or questions.
              </p>
            </div>
            <Button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white"
              style={{ color: 'white' }}
            >
              Got it
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Get your RFQ in 24h
              </h3>
              <p className="text-sm text-slate-500">
                Two quick fields. We'll reply within 12 hours.
              </p>
            </header>

            {/* Honeypot field (hidden from users) */}
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              className="sr-only"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Form */}
            <div className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-orange-500">*</span>
                </label>
                <Input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={(e) => handleKeyDown(e, 'email')}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={emailError ? 'border-red-500' : ''}
                  aria-required="true"
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {emailError}
                  </p>
                )}
              </div>

              {/* Name field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-orange-500">*</span>
                </label>
                <Input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onKeyDown={(e) => handleKeyDown(e, 'name')}
                  placeholder="Your name"
                  autoComplete="name"
                  className={nameError ? 'border-red-500' : ''}
                  aria-required="true"
                />
                {nameError && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {nameError}
                  </p>
                )}
              </div>

              {/* Country field (optional) */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country/Region
                </label>
                <Input
                  ref={countryInputRef}
                  type="text"
                  value={country}
                  onChange={handleCountryChange}
                  onKeyDown={(e) => handleKeyDown(e, 'country')}
                  onFocus={() => setShowCountryDropdown(true)}
                  placeholder="Country (optional)"
                  onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
                />
                
                {/* Country dropdown */}
                {showCountryDropdown && country && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredCountries.map((countryName) => (
                      <button
                        key={countryName}
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        onClick={() => selectCountry(countryName)}
                      >
                        {countryName}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Message field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (optional)
                </label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project requirements, such as product specifications, quantity, target market, certification needs, or any technical questions..."
                  rows={5}
                  className="resize-none"
                />
              </div>

              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments (optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setAttachedFiles(prev => [...prev, ...files]);
                      e.target.value = '';
                    }}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOC, DWG, STEP files (Max 10MB)</p>
                  </label>
                </div>
                
                {/* Display attached files */}
                {attachedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {attachedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-50 rounded p-2 text-xs">
                        <span className="truncate flex-1 mr-2">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Error message */}
            {submitError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            )}
            
            {/* Submit button */}
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
              style={{ color: 'white' }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send my RFQ
                </>
              )}
            </Button>

            {/* Footer links */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500 mb-2">
                Need to attach files or an NDA? Reply to the confirmation email.
              </p>
              <div className="flex justify-center gap-4 text-xs">
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-700"
                  onClick={(e) => {
                    e.preventDefault();
                    // 这里可以添加隐私政策链接
                  }}
                >
                  Privacy
                </a>
                <button
                  type="button"
                  className="text-green-600 hover:text-green-700"
                  onClick={() => onSubmit({ status: 'whatsapp', message: 'User prefers WhatsApp communication' })}
                >
                  <MessageCircle className="h-3 w-3 inline mr-1" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}