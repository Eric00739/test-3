'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Check, AlertCircle, Upload, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RFQ_MAILTO_EMAIL } from '@/config/rfq-config';

export interface RfqModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (result: {
    status: 'success' | 'error' | 'whatsapp' | 'mailto';
    message?: string;
    data?: any;
  }) => void;
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

export function RfqModal({ open, onClose, onSubmit, source = 'default' }: RfqModalProps) {
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
  
  // Step 1 form fields
  const [useCase, setUseCase] = useState('');
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [band, setBand] = useState('');
  
  // Step 2 form fields
  const [originalBrand, setOriginalBrand] = useState('');
  const [encoding, setEncoding] = useState('');
  const [targetRange, setTargetRange] = useState('');
  const [codeChange, setCodeChange] = useState('');
  const [buttons, setButtons] = useState('');
  const [receiver, setReceiver] = useState('');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [ticketId, setTicketId] = useState('');
  
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
    if (!useCase.trim()) {
      setSubmitError('Please describe your use case.');
      hasError = true;
    }
    if (!productType) {
      setSubmitError('Please select a product type.');
      hasError = true;
    }
    if (!quantity) {
      setSubmitError('Please select a quantity tier.');
      hasError = true;
    }
    if (!band) {
      setSubmitError('Please select a frequency band.');
      hasError = true;
    }
    
    if (hasError) return;
    
    // 检查honeypot字段（防止垃圾邮件）
    if (honeypotRef.current?.value) return;
    
    // 记录提交时间
    setLastSubmitTime(now);
    
    // 设置提交状态
    setIsSubmitting(true);
    
    // 生成工单ID
    const newTicketId = `FF-${Date.now().toString().slice(-8)}`;
    setTicketId(newTicketId);
    
    try {
      // 准备表单数据
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim());
      formData.append('country', country.trim());
      formData.append('message', `Use Case: ${useCase}\nProduct Type: ${productType}\nQuantity: ${quantity}\nFrequency Band: ${band}\n${productType === 'inStock' ? `Original Brand/Model: ${originalBrand}\nEncoding/Chip: ${encoding}\nTarget Range: ${targetRange}` : ''}${productType === 'config' ? `Code Change: ${codeChange}\nButtons/Appearance: ${buttons}\nReceiver Type: ${receiver}` : ''}`);
      formData.append('source', source);
      
      // 添加附件
      attachedFiles.forEach((file) => {
        formData.append('attachments', file);
      });
      
      // 发送API请求
      const response = await fetch('/api/rfq', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        // 服务器成功发送邮件
        onSubmit({
          status: 'success',
          message: result.message || 'RFQ submitted successfully. We will contact you soon.',
          data: { ticketId: newTicketId }
        });
        
        setIsSubmitted(true);
        
        // 延迟关闭弹窗
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setIsSubmitting(false);
        }, 3000);
      } else if (result.fallback) {
        // 服务器无法发送邮件，使用客户端回退
        const body = [
          `Hi FastFunRC team,`,
          '',
          `I'd like to request a quotation for your wireless control solutions.`,
          '',
          `Ticket ID: ${newTicketId}`,
          `Name: ${name}`,
          `Email: ${email}`,
          `Use Case: ${useCase}`,
          `Product Type: ${productType}`,
          `Quantity: ${quantity}`,
          `Frequency Band: ${band}`,
          country && `Company: ${country}`,
          '',
          ...productType === 'inStock' ? [
            `Original Brand/Model: ${originalBrand}`,
            `Encoding/Chip: ${encoding}`,
            `Target Range: ${targetRange}`,
          ] : [],
          ...productType === 'config' ? [
            `Code Change: ${codeChange}`,
            `Buttons/Appearance: ${buttons}`,
            `Receiver Type: ${receiver}`,
          ] : [],
          attachedFiles.length > 0 && `Attachments: ${attachedFiles.map((f: File) => f.name).join(', ')}`,
          '',
          `Please send me your product catalog and current pricing information.`,
          '',
          `Thank you!`
        ].filter(Boolean).join('\n');
        
        const params = new URLSearchParams({
          subject: `RFQ received - Ticket ${newTicketId} — we'll reply within business hours`,
          body,
        });
        
        const mailtoUrl = `mailto:${RFQ_MAILTO_EMAIL}?${params.toString()}`;
        
        onSubmit({
          status: 'mailto',
          message: result.message || 'Server email services are unavailable. Opening your email client...',
          data: { mailtoUrl, ticketId: newTicketId }
        });
        
        setIsSubmitted(true);
        
        // 延迟关闭弹窗和打开邮件客户端
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setIsSubmitting(false);
          window.location.href = mailtoUrl;
        }, 3000);
      } else {
        // 发生错误
        throw new Error(result.error || 'Failed to submit RFQ');
      }
    } catch (error) {
      console.error('RFQ submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit RFQ. Please try again.');
      setIsSubmitting(false);
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

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-900/70"
            onClick={onClose}
            aria-label="Close RFQ overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Request a custom quotation"
            className="relative z-10 w-full max-w-lg sm:max-w-xl rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto"
            style={{ maxHeight: '700px' } as any}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
        {/* 成功状态 */}
        {isSubmitted ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Request submitted successfully!
            </h3>
            <p className="text-base text-slate-600 mb-4">
              Ticket #{ticketId} created. We'll reply within business hours; with complete docs, samples/feasibility in 2–5 days.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800 font-medium">
                We&apos;re received and will be processed now. Just press “Send” in the email window to complete the request.
              </p>
            </div>
            <p className="text-xs text-slate-400">
              This dialog will close automatically.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {currentStep === 1 ? "Tell us about your project" : "Additional details"}
              </h3>
              <p className="text-sm text-slate-500">
                {currentStep === 1 ? "Required information to get started" : "Help us understand your specific requirements"}
              </p>
              {currentStep === 2 && (
                <div className="flex items-center justify-center mt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    ← Back to step 1
                  </button>
                </div>
              )}
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
              {currentStep === 1 ? (
                <>
                  {/* Use case field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Use case <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      placeholder="Describe your application"
                      className={!useCase ? 'border-red-500' : ''}
                      aria-required="true"
                    />
                  </div>

                  {/* Product type field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product type <span className="text-orange-500">*</span>
                    </label>
                    <select
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      aria-required="true"
                    >
                      <option value="">Select product type</option>
                      <option value="inStock">In-stock/Replacement</option>
                      <option value="config">Configurable</option>
                      <option value="custom">Custom development</option>
                    </select>
                  </div>

                  {/* Quantity field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity tier <span className="text-orange-500">*</span>
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      aria-required="true"
                    >
                      <option value="">Select quantity tier</option>
                      <option value="sample">Sample (1-10)</option>
                      <option value="small">Small batch (50-200)</option>
                      <option value="medium">Medium batch (200-500)</option>
                      <option value="large">Large batch (500+)</option>
                    </select>
                  </div>

                  {/* Band field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency band <span className="text-orange-500">*</span>
                    </label>
                    <select
                      value={band}
                      onChange={(e) => setBand(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      aria-required="true"
                    >
                      <option value="">Select frequency band</option>
                      <option value="315">315 MHz</option>
                      <option value="433">433.92 MHz</option>
                      <option value="446">446 MHz</option>
                      <option value="447">447 MHz</option>
                      <option value="868">868 MHz</option>
                      <option value="915">915 MHz</option>
                    </select>
                  </div>

                  {/* Contact information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact information <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Email address"
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

                  <div>
                    <Input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Full name"
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

                  <Input
                    type="text"
                    value={country}
                    onChange={handleCountryChange}
                    placeholder="Company (optional)"
                  />
                </>
              ) : (
                <>
                  {/* Dynamic fields based on product type */}
                  {productType === 'inStock' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Original brand/model
                        </label>
                        <Input
                          value={originalBrand}
                          onChange={(e) => setOriginalBrand(e.target.value)}
                          placeholder="Enter original brand and model"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Encoding/chip information
                        </label>
                        <Input
                          value={encoding}
                          onChange={(e) => setEncoding(e.target.value)}
                          placeholder="Enter encoding or chip details"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target range requirement
                        </label>
                        <Input
                          value={targetRange}
                          onChange={(e) => setTargetRange(e.target.value)}
                          placeholder="Specify required range"
                        />
                      </div>
                    </>
                  )}

                  {productType === 'config' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Code change requirements
                        </label>
                        <Input
                          value={codeChange}
                          onChange={(e) => setCodeChange(e.target.value)}
                          placeholder="Describe code changes needed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Button layout/color/branding
                        </label>
                        <Input
                          value={buttons}
                          onChange={(e) => setButtons(e.target.value)}
                          placeholder="Describe button and appearance requirements"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Receiver needed (relay/logic/UART)
                        </label>
                        <Input
                          value={receiver}
                          onChange={(e) => setReceiver(e.target.value)}
                          placeholder="Specify receiver type needed"
                        />
                      </div>
                    </>
                  )}

                  {/* File upload for both paths */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload files (optional)
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
                </>
              )}
            </div>

            {/* Error message */}
            {submitError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            )}
            
            {/* Submit/Next button */}
            <Button
              type="button"
              onClick={currentStep === 1 ? () => setCurrentStep(2) : handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  {currentStep === 1 ? (
                    <>
                      Next Step
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </>
                  )}
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
      )}
    </AnimatePresence>
  );
}
