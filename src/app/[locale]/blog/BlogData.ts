
import { getAllBlogPosts } from '@/lib/markdown'

export interface BlogArticle {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured: boolean
  views: number
  likes: number
}

// Get blog posts from Markdown files
const markdownPosts = getAllBlogPosts()

// Convert markdown posts to BlogArticle format
export const blogData: BlogArticle[] = markdownPosts.map((post, index) => ({
  id: index + 1,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  author: post.author,
  date: post.date,
  readTime: post.readTime,
  category: post.category,
  tags: post.tags,
  image: post.image,
  featured: post.featured || false,
  views: Math.floor(Math.random() * 10000) + 1000, // Random views for demo
  likes: Math.floor(Math.random() * 500) + 50, // Random likes for demo
}))

// Legacy blog data (keeping for reference)
export const legacyBlogData: BlogArticle[] = [
  {
    id: 1,
    slug: 'revolutionary-rc-technology',
    title: 'Revolutionary RC Technology: The Future of Remote Control',
    excerpt:
      "Explore the cutting-edge advancements in RC technology that are reshaping the industry. From AI-powered controls to next-generation battery systems, discover what's next.",
    content: `
      <p>The world of remote control technology is undergoing a transformation unlike anything we've seen before. As we stand at the precipice of a new era, innovations in artificial intelligence, battery technology, and connectivity are converging to create experiences that were once the stuff of science fiction.</p>

      <h2>AI-Powered Intelligence</h2>
      <p>Artificial intelligence is no longer just a buzzword in the RC industry. Modern RC devices now incorporate machine learning algorithms that adapt to user behavior, predict movements, and even assist in complex maneuvers. This intelligent assistance doesn't replace the human element – it enhances it, allowing enthusiasts to push the boundaries of what's possible.</p>

      <h2>Next-Generation Battery Systems</h2>
      <p>The evolution of battery technology has been a game-changer for RC enthusiasts. Lithium-polymer batteries gave us unprecedented power-to-weight ratios, but the future lies in solid-state technology and graphene-enhanced cells. These innovations promise longer flight times, faster charging, and improved safety profiles.</p>

      <h2>Connectivity Revolution</h2>
      <p>5G technology is set to revolutionize how we interact with our RC devices. With ultra-low latency and high bandwidth, operators will experience real-time control with virtually no delay. This opens up possibilities for professional applications in cinematography, inspection, and beyond.</p>

      <p>As we look to the future, one thing is clear: the golden age of RC technology is just beginning. The convergence of these technologies will create experiences that are more immersive, more capable, and more accessible than ever before.</p>
    `,
    author: 'Alex Chen',
    date: '2024-01-20',
    readTime: '8 min read',
    category: 'technology',
    tags: ['RC Tech', 'Innovation', 'AI'],
    image: 'https://picsum.photos/seed/rc1/1200/800',
    featured: true,
    views: 5420,
    likes: 234,
  },
  {
    id: 2,
    slug: 'rc-drone-maintenance-guide',
    title: 'Complete Guide to RC Drone Maintenance',
    excerpt:
      'Learn the essential maintenance procedures to keep your RC drone in peak condition. This comprehensive guide covers everything from basic checks to advanced troubleshooting.',
    content: `
      <p>Proper maintenance is the key to extending the life of your RC drone and ensuring optimal performance. Whether you're a beginner or an experienced pilot, following a regular maintenance schedule will save you time, money, and frustration in the long run.</p>

      <h2>Pre-Flight Checks</h2>
      <p>Before every flight, perform a thorough inspection of your drone. Check for loose screws, damaged propellers, and ensure all connections are secure. Verify that the battery is properly charged and seated. These simple checks can prevent catastrophic failures mid-flight.</p>

      <h2>Regular Cleaning</h2>
      <p>Dust and debris can accumulate in critical areas of your drone, affecting performance. Use compressed air to clean motors and electronic components. Wipe down the frame with a soft, slightly damp cloth. Avoid using harsh chemicals that could damage electronic components.</p>

      <h2>Battery Care</h2>
      <p>Your drone's battery is its lifeline. Store batteries at 50% charge when not in use for extended periods. Avoid extreme temperatures and never leave batteries charging unattended. Inspect batteries regularly for swelling or damage – these are signs that it's time for replacement.</p>

      <h2>Software Updates</h2>
      <p>Keep your drone's firmware up to date. Manufacturers regularly release updates that improve performance, add features, and patch security vulnerabilities. Always follow the manufacturer's update instructions carefully to avoid bricking your device.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-01-19',
    readTime: '12 min read',
    category: 'tutorials',
    tags: ['Maintenance', 'Drones', 'Guide'],
    image: 'https://picsum.photos/seed/rc2/1200/800',
    featured: false,
    views: 3210,
    likes: 156,
  },
  {
    id: 3,
    slug: 'rc-market-trends-2024',
    title: 'Industry Report: RC Market Trends 2024',
    excerpt:
      'An in-depth analysis of the RC market trends for 2024. Discover emerging opportunities, consumer preferences, and technological shifts driving the industry forward.',
    content: `
      <p>The RC industry is experiencing unprecedented growth and transformation in 2024. Market analysis reveals several key trends that are shaping the future of remote control technology and creating new opportunities for businesses and enthusiasts alike.</p>

      <h2>Market Growth Projections</h2>
      <p>The global RC market is projected to reach $45 billion by 2028, growing at a CAGR of 12.3%. This growth is driven by increasing adoption in commercial applications, technological advancements, and growing consumer interest in hobbyist activities.</p>

      <h2>Commercial Applications Leading</h2>
      <p>While consumer drones and RC vehicles remain popular, commercial applications are driving significant growth. Industries such as agriculture, construction, and cinematography are increasingly relying on RC technology for efficiency and innovation.</p>

      <h2>Technological Innovation</h2>
      <p>Advancements in battery technology, AI integration, and materials science are pushing the boundaries of what's possible. We're seeing longer flight times, improved durability, and enhanced capabilities that were unimaginable just a few years ago.</p>

      <h2>Regulatory Landscape</h2>
      <p>Regulations continue to evolve, balancing safety concerns with innovation. Countries are developing more sophisticated frameworks for RC operations, particularly for commercial applications. Staying informed about regulatory changes is crucial for industry participants.</p>
    `,
    author: 'Michael Roberts',
    date: '2024-01-18',
    readTime: '15 min read',
    category: 'industry',
    tags: ['Market Analysis', 'Trends', '2024'],
    image: 'https://picsum.photos/seed/rc3/1200/800',
    featured: true,
    views: 8920,
    likes: 412,
  },
  {
    id: 4,
    slug: 'top-10-rc-cars-2024',
    title: 'Top 10 RC Cars of 2024: Expert Reviews',
    excerpt:
      'Our expert team reviews the top 10 RC cars of 2024. From speed demons to off-road beasts, find your perfect match with our detailed analysis.',
    content: `
      <p>2024 has been an exceptional year for RC car enthusiasts. Manufacturers have pushed the boundaries of performance, design, and innovation. Our team has tested dozens of models to bring you the definitive list of the year's best RC cars.</p>

      <h2>1. Traxxas X-Maxx Ultimate</h2>
      <p>The X-Maxx continues to dominate the monster truck category with its unparalleled durability and performance. The 2024 Ultimate edition brings improved suspension geometry and a more powerful brushless system.</p>

      <h2>2. Arrma Kraton 8S BLX</h2>
      <p>For speed enthusiasts, the Kraton 8S delivers blistering performance in a tough, ready-to-run package. Its big bore shocks and adjustable wheelie bars make it a favorite among bashers.</p>

      <h2>3. Losi Super Baja Rey 2.0</h2>
      <p>The updated Super Baja Rey brings desert racing excitement to your local track. With realistic suspension and a detailed body, it offers an unmatched scale experience.</p>

      <h2>4. Team Associated RC10B6.3D</h2>
      <p>For serious racers, the B6.3D represents the pinnacle of 2WD buggy design. Its adjustable geometry and proven race pedigree make it a track champion.</p>
    `,
    author: 'David Lee',
    date: '2024-01-17',
    readTime: '10 min read',
    category: 'reviews',
    tags: ['Reviews', 'RC Cars', '2024'],
    image: 'https://picsum.photos/seed/rc4/1200/800',
    featured: false,
    views: 6780,
    likes: 289,
  },
  {
    id: 5,
    slug: 'building-first-rc-robot',
    title: "Building Your First RC Robot: A Beginner's Journey",
    excerpt:
      "Step-by-step tutorial for building your first RC robot. Learn about components, assembly, programming, and testing in this comprehensive guide.",
    content: `
      <p>Building your first RC robot is an incredibly rewarding experience that combines mechanical engineering, electronics, and programming. This guide will walk you through every step of the process, from selecting components to programming your creation.</p>

      <h2>Choosing Your Platform</h2>
      <p>Start with a simple chassis kit that includes the basic mechanical components. Look for kits that include motors, wheels, and a basic frame. Arduino-based platforms are excellent for beginners due to their extensive community support and straightforward programming.</p>

      <h2>Essential Components</h2>
      <p>You'll need a microcontroller (Arduino Uno is perfect for starters), motor driver, servo motors for steering, batteries, and a radio control system. Don't forget essential tools like soldering iron, multimeter, and basic hand tools.</p>

      <h2>Assembly Process</h2>
      <p>Follow the kit instructions carefully for mechanical assembly. Take your time with the electronics – proper wiring is crucial for reliable operation. Test each component individually before integrating the full system.</p>

      <h2>Programming Basics</h2>
      <p>Start with simple programs to test motor control and steering. Gradually add complexity as you become more comfortable with the code. The Arduino community offers countless examples and libraries to help you get started.</p>
    `,
    author: 'Emily Watson',
    date: '2024-01-16',
    readTime: '20 min read',
    category: 'tutorials',
    tags: ['Robotics', 'DIY', 'Beginner'],
    image: 'https://picsum.photos/seed/rc5/1200/800',
    featured: false,
    views: 4560,
    likes: 198,
  },
  {
    id: 6,
    slug: 'impact-5g-rc-technology',
    title: 'The Impact of 5G on RC Technology',
    excerpt:
      'How 5G connectivity is revolutionizing RC technology. Explore low-latency control, real-time video streaming, and enhanced user experiences.',
    content: `
      <p>The rollout of 5G networks is set to transform the RC industry in ways we're only beginning to understand. With speeds up to 100 times faster than 4G and latency as low as 1 millisecond, 5G opens up possibilities that were previously impossible.</p>

      <h2>Ultra-Low Latency Control</h2>
      <p>The most significant impact of 5G on RC technology is the dramatic reduction in latency. Traditional RC systems operate with delays of 20-100 milliseconds. 5G reduces this to under 5 milliseconds, creating an experience that feels instantaneous.</p>

      <h2>Real-Time 4K Video</h2>
      <p>5G's bandwidth capabilities enable real-time 4K video streaming from RC devices. This is revolutionary for applications like search and rescue, infrastructure inspection, and professional cinematography.</p>

      <h2>Enhanced Reliability</h2>
      <p>5G networks offer improved reliability and coverage, reducing the risk of signal loss during critical operations. Network slicing allows for dedicated bandwidth for mission-critical applications.</p>

      <h2>Future Possibilities</h2>
      <p>As 5G networks mature, we'll see the emergence of fleet management systems, autonomous RC operations, and integration with IoT ecosystems. The combination of 5G and AI will create truly intelligent RC systems.</p>
    `,
    author: 'James Wilson',
    date: '2024-01-15',
    readTime: '7 min read',
    category: 'technology',
    tags: ['5G', 'Connectivity', 'Future'],
    image: 'https://picsum.photos/seed/rc6/1200/800',
    featured: true,
    views: 7230,
    likes: 345,
  },
]
