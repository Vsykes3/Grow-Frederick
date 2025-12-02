'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// All blog posts with full content
const blogPosts: Record<string, {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}> = {
  'getting-started-frederick-county-gardening': {
    id: '1',
    title: 'Getting Started with Gardening in Frederick County: A Complete Guide for Zone 6b-7a',
    content: `
      <h2>Understanding Your Growing Zone</h2>
      <p>Frederick County sits in USDA Hardiness Zones 6b-7a, which means we experience cold winters (minimum temperatures of -5°F to 5°F) and warm summers. This unique climate allows for a diverse range of plants, but timing is everything.</p>
      
      <h2>When to Start Your Garden</h2>
      <p>In Frederick County, the last frost typically occurs around mid-April to early May. This means:</p>
      <ul>
        <li><strong>Early March:</strong> Start seeds indoors for tomatoes, peppers, and eggplants</li>
        <li><strong>Mid-April:</strong> Direct sow cool-season crops like lettuce, spinach, and peas</li>
        <li><strong>Early May:</strong> Transplant warm-season crops after danger of frost has passed</li>
        <li><strong>Late May:</strong> Direct sow warm-season crops like beans, corn, and squash</li>
      </ul>
      
      <h2>Choosing the Right Location</h2>
      <p>Most vegetables need at least 6-8 hours of direct sunlight daily. Observe your yard throughout the day to find the sunniest spots. Consider:</p>
      <ul>
        <li>South-facing areas receive the most sun</li>
        <li>Protection from strong winds</li>
        <li>Access to water sources</li>
        <li>Well-draining soil</li>
      </ul>
      
      <h2>Preparing Your Soil</h2>
      <p>Maryland soil can be heavy clay, which needs amending. Test your soil pH (aim for 6.0-7.0) and add organic matter like compost. Raised beds are excellent for improving drainage in clay soils.</p>
      
      <h2>Essential Tools for Beginners</h2>
      <ul>
        <li>Hand trowel and fork</li>
        <li>Garden hoe</li>
        <li>Watering can or hose</li>
        <li>Garden gloves</li>
        <li>Pruning shears</li>
      </ul>
      
      <h2>Top 5 Beginner-Friendly Vegetables</h2>
      <ol>
        <li><strong>Lettuce:</strong> Fast-growing, can be harvested multiple times</li>
        <li><strong>Radishes:</strong> Ready in 25-30 days</li>
        <li><strong>Green Beans:</strong> Productive and easy to grow</li>
        <li><strong>Tomatoes:</strong> Start with cherry varieties for best success</li>
        <li><strong>Zucchini:</strong> Very productive, just don't plant too many!</li>
      </ol>
      
      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Planting too early (wait for proper soil temperature)</li>
        <li>Overcrowding plants (follow spacing guidelines)</li>
        <li>Over or under-watering (aim for consistent moisture)</li>
        <li>Ignoring pests (check plants regularly)</li>
        <li>Not rotating crops (prevents disease buildup)</li>
      </ul>
      
      <h2>Getting Help</h2>
      <p>Remember, every gardener was once a beginner. Join the GrowCommon community to ask questions, share successes, and learn from experienced gardeners in Frederick County. Happy gardening!</p>
    `,
    author: 'Maxwell Liu',
    publishedAt: new Date().toISOString(),
    category: 'Getting Started',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop&q=80',
    slug: 'getting-started-frederick-county-gardening'
  },
  'horticultural-therapy-tourettes': {
    id: '2',
    title: "From Tics to Tomatoes: My Journey with Tourette's and Gardening",
    content: `
      <h2>My Personal Experience: Finding Peace through Gardening</h2>
      <p>I remember distinctly the first time I realized what a difference this was making. It was a muggy July day, and I was kneeling in my backyard, hands smeared with soil, as I carefully moved tomato starts that I'd grown from seed eight weeks prior. My Tourette's tics, the violent shoulder spasms and neck twitches that had been particularly severe that week, had abated almost to a whisper. It was the first day that my mind had had a reprieve from preparing for the next twitch.</p>
      <p>That's when everything changed.</p>
      <p>Living with Tourette's is a lot of "tic management." And what about this "silent, mental" experience? It's the constant mental fatigue of being observed. The anxiety preceding social interactions. The aggravation that accompanies stress. It's trying to "explain" that, "no, you can't just 'stop' anything." Of course, for years, I sought different techniques—medications, therapy, a meditation app, a fitness plan. These aided. "Gardening" is the only thing that's made a difference to my "daily" activities.</p>
      <p>It's my story of, quite literally, getting my hands dirty, and how this experience led to my finding my peace of mind and my reasons for launching GrowCommon, where you can find your own piece of peace.</p>
      
      <h2>What is Horticultural Therapy? And Why Isn't Everyone Talking About It?</h2>
      <p>Before I dived into gardening, I'd never come across the phrase "horticultural therapy." It's a tad intimidating—and rather scientific-sounding, actually. And simply stated, horticultural therapy is the practice of using plant-related tasks to better one's health.</p>
      <p>What I found most surprising was this is not some sort of alternative therapy on the fringe. Horticultural therapy is a recognized profession, with licensed practitioners working in hospitals, rehabilitation facilities, veterans' institutions, and mental health centers around the world. It is a professional association that dates back to 1973, and there is proof of success among patients who suffer from anxiety, depression, PTSD, dementia, autism, or neurologically-related disorders such as Tourette's.</p>
      <p>And the science is compelling: research shows that a mere 30 minutes of gardening can reduce blood levels of the stress hormone cortisol, lower blood pressure, and improve mood. Functional brain scans prove that nature stimulates our parasympathetic nervous system, or "rest and digest" functions, silencing our own personal brains' centers of anxiety, the amygdalae.</p>
      <p>However, what the scientific papers lack is the sensation of feeling your shoulders release from your head when you sniff fresh basil. The surprise of finding your first cucumber hiding among its leaves. The satisfaction of preparing a salad from nothing but plant materials you have raised yourself.</p>
      
      <h2>How Gardening is Helpful for People with Tourette's Symptoms</h2>
      <h3>1. Focus and Mindfulness, or How Checking the Soil Became My Meditation Practice</h3>
      <p>Everyone kept telling me to "try mindfulness" or "just meditate." I'd download the app, sit cross-legged on a cushion, and attempt to focus on my breath. And make maybe 90 seconds before my mind began firing from task list to stress about work to attention to my tics.</p>
      <p>Gardening is a different matter altogether. It's meditation for a cause.</p>
      <p>When I am surveying a tomato plant for caterpillars, I am not trying to empty my mind—I'm totally engaged in the process. I am scrutinizing the undersides of leaves, exploring for droppings, exploring the texture of stems. When I determine if my lettuce requires watering, I thrust my index finger two inches into the soil, appraise soil dampness, evaluate the weather forecast, and recall the last watering date.</p>
      <p>All of this attention creates what is known as a "flow state," that place where you're so caught up in what you're doing that you forget about time. It's a serious thing for a Tourette's sufferer. My tics aren't gone, exactly, but they're background noises. Even better, I'm not paying attention to them. I'm breaking the feedback cycle that can make all of this worse.</p>
      <p>I have learned what chores can be done in what mental condition. Weeding is good for days when my mind is all over the place—repetitive, easy, and giving quick satisfaction. Planting seeds is a task that requires finesse, appropriate for when my mind wants to be slower. Harvesting is a pleasure, a bonus-free task.</p>
      
      <h3>2. Physical Activity (The Kind That Actually Helps)</h3>
      <p>Here's something that docs don't always talk about when they're describing Tourette's: The tics themselves can be really tiresome, but the constant effort to resist them is even more exhausting. By the time evening arrives, my neck and shoulders feel as if they have been constricted by a vice for the entire day.</p>
      <p>Exercise is the sort of thing that traditionally felt like another box to check on the list of self-improvement. Gym membership? Crowded, much of a humiliation about my motor mannerisms. Running? Motor mannerisms made that difficult to attempt.</p>
      <p>Gardening, on the other hand, is exercise that requires a different uniform. I am absolutely not "working out" when, for example, I am hauling watering pots, digging holes, and lifting sacks of compost. It is purpose-driven, practical exercise. And the greatest thing about this is that I can get this done all by myself.</p>
      <p>The repetitive motion of much of what happens in a garden—the swinging back and forth of raking, the rhythm of hoeing, the line-by-line weeding of a bed—is a physical pattern that functions to calm the neurological misfirings of a tic. And some days, after an hour of gentle gardening, my motor tics improve. It's a long way from a cure, but a significant improvement.</p>
      <p>And whereas a workout that I can mandate myself to do, this is something that I actually enjoy. That's something that fitness experts underestimate.</p>
      
      <h3>3. Sense of Accomplishment (when Everything Else is spiraling Out of Control)</h3>
      <p>Life with Tourette's is living with your body betraying you constantly. You can't control the tics. You can't predict when your tics are going to be worse. Doctor's appointments, meds that have side effects, social situations that blow up because someone just didn't get it—so much of this is outside of your control.</p>
      <p>Then you plant the seed. You water it. You wait for the sprout to appear. You remove the weak seedlings, up the best ones, stake them as they grow. You harvest the first ripened tomato, warm from the sun. You slice it for dinner, and it tastes like sunshine.</p>
      <p>You did that. Every step. From seed to plate.</p>
      <p>This feeling of agency—of directly creating something good, through my own direct effort—remains incredibly therapeutic, and I'm finding that I'm difficult to articulate. Every successful growing plant is a demonstration that I am capable of this. Every harvest is a demonstration that, even through the turmoil that Tourette's brings, I am capable of creating.</p>
      <p>I keep a garden journal now. Not because anyone encouraged this habit, but because I need to document progress myself. Photos of seedlings growing into massive tomato plants. Lists of what worked well. Entries about harvest dates. It's my way of proving to myself that I am something more than my diagnosis, that I have skills, that I have patience, that I can watch something through from start to finish.</p>
      <p>In a chronic situation, these victories mean a lot.</p>
      
      <h3>4. Stress Reduction. The Science and The Essence of Health</h3>
      <p>The scientific literature that examines nature experience and stress is vast. It was made abundantly clear that spending time in nature reverses high blood pressure, reduces blood pressure, boosts the immune system, and even optimises mood. For Tourette patients, stress is the largest tic inducer.</p>
      <p>I have lived this cycle numerous times: a stressful deadline looming, anxious feelings mount, tics increase, sleep patterns deteriorate, tics escalate, and anxieties about the tics multiply all of these concerns. It's a never-ending cycle.</p>
      <p>Gardening interferes with that cycle at a number of points. Simply being outside among the plants reduces stress hormones—this is biology. But there's a non-biological aspect, something that can't be measured: the garden is indifferent to my tic mannerisms.</p>
      <p>Plants don't glare. They don't say what they mean. They don't shoot that look that a person reserves for something they're trying to keep from being obvious from a twitch. They just grow. Tomatoes don't judge me. Zinnias don't need explanation. My garden is the only place where I can be myself.</p>
      <p>It is a deep relief to be able to accept this.</p>
      <p>Additionally, I have observed another interesting thing. The garden is a school where a softer way of treating time is practiced. I can't hurry a tomato to ripeness through my worries about it. I can't hurry a seed to grow through my anxieties. The garden is on nature's clock, and this is wonderfully soothing.</p>
      <p>It's a truth that some of my worst tic days have led to my most peaceful mornings spent among the gardens. It's no panacea, but this resets something basic.</p>
      
      <h3>5. Routine and Structure (The Comfort of Predictable Patterns)</h3>
      <p>The most difficult thing about Tourette's is its unpredictability. Will this be a day of bad tics or a day of manageable ones? Will that social situation send my tics through the roof? Will stress make all of this worse? You learn to deal with uncertainty side by side.</p>
      <p>It provides a thing that's even rarer than color—a predictable, meaningful structure.</p>
      <p>Tomatoes require watering when the soil above one inch is dry. Plant lettuce in early spring and fall if you reside in Zone 6b-7a. Pinching—the process of removing tips to promote bushy growth—is necessary for basil. These aren't random rules; these patterns occur naturally, and I can learn to see them.</p>
      <p>It's become my routine to make a quick scan of the garden each morning. It's a short walk-around, determining what watering is needed, checking for pest problems, gathering whatever is ripe, weeding a few plants. It only takes about 15 minutes, but it helps me ground myself for the rest of the day. I get something done even before I open my email or catch up on the news.</p>
      <p>This routine offers structure without being inflexible. If I blow a day, the world won't end. If I want to adjust my schedule, that's also okay. It's steady without being punitive, exactly what I need being a person living under the neurological constraints of my own condition.</p>
      <p>Additionally, the seasonality of gardening offers another rhythm. Planting, or indoor seed starting, happens in February. Transplanting takes place in April. Maintenance or harvest happens in June. Fall planting starts in September. Finally, planning for the upcoming garden happens in December. This is something I look forward to, something that will keep going no matter what is happening with my Tourette's.</p>
      <p>When a situation is chaotic, these patterns serve as a beacon.</p>
      
      <h2>Challenges That I Don't Always Talk About</h2>
      <p>I want to be honest—gardening with Tourette's isn't always a pretty picture.</p>
      <p>Certain days, my motor skills can make even minute tasks such as planting seedlings quite difficult for me. I can recall instances where I have damaged seedlings because of a sudden twitch of my arm. I have had instances where I dropped entire trays of seeds.</p>
      <p>Even vocal tics in a quiet garden setting can be jarring. I have startled strangers, or passersby, who have puzzled over my inexplicable noises.</p>
      <p>On my worst days, I just can't garden. The energy—physical or mental—simply isn't there. The garden just happens without me, and that is a humbling, oddly reassuring experience.</p>
      <p>I share this because I think it is significant. Gardening, for me, has been a lifesaver, but it is far from a "miracle" cure. It is a tool, a practice, a place of relief and of joy, but I am, nonetheless, living with a neurological condition. It's certainly done nothing to "cure" my Tourette's.</p>
      <p>That's enough. That's actually more than enough.</p>
      
      <h2>Practical advice for gardeners living with Tourette's (or lessons learned the hard way)</h2>
      <h3>Start Smaller Than You Think You're Able To</h3>
      <p>My first garden was laughably small—just four tomato plants in pots on my deck. I was being conservative. In retrospect, that was absolutely ideal. Success with that quartet of plants encouraged me for the upcoming season.</p>
      <p>Begin with one raised bed. Or even a planter of herbs on a windowsill. You can always add to what you're already growing. It's a way to prove to yourself that you can grow your own food.</p>
      
      <h3>Use a Plant That Forgives Mistakes</h3>
      <p>But some species of plant can be notoriously unforgiving. Orchids, for example, will call you to task for each and every mistake. Then there are those that can't help but be almost laughably easy to grow. Cherry tomatoes, zucchini, basil, marigolds, and zinnias, for example.</p>
      <p>Begin with the forgiving ones. Boost your confidence. The fussy plants can wait until you get prepared.</p>
      
      <h3>Invest in Good Tools (Your Body Will Thank You)</h3>
      <p>Light weight, easy-to-grip tools mean less effort is required. Ergonomics make a difference, especially when you're already experiencing mannerisms and muscular tension. My top picks:</p>
      <ul>
        <li>Hoe (long handled) – saves bending</li>
        <li>Hand tools, Japanese type (light, strong)</li>
        <li>Cushioned kneeling pad (game-changer)</li>
        <li>Light watering can. It is much easier to steer.</li>
      </ul>
      <p>High quality tools aren't cheap, but they really make the task easier.</p>
      
      <h3>Create Zones for Different Energy Levels</h3>
      <p>Certain garden chores require concentration and subtlety (transplanting seedlings, harvesting fragile herbs). Another set can be done on low-tic or high-tic days, such as weeding, watering, or mulching. I have designed my garden to pick tasks according to my mental state.</p>
      <p>This relieves the pressure. The garden accepts me as I am, and not as I would like to be.</p>
      
      <h3>Create Sensory Experiences</h3>
      <p>I have planted certain species for their sensory benefit, such as:</p>
      <ul>
        <li>Lavender and lemon balm to brush against (scent therapy)</li>
        <li>Lamb's ear for its exceptionally soft leaves</li>
        <li>Ornamental grasses whispering through the wind</li>
        <li>Colored flowers that entice butterflies (sight stimulation, without excitement)</li>
      </ul>
      <p>The garden stimulates a range of senses through pleasant methods.</p>
      
      <h3>Connect to Understanding Communities</h3>
      <p>Not all people understand, but finding communities, either virtual or actual, of people who comprehend the therapy of gardens as well as the truth of health condition management is a massive help.</p>
      <p>All these reasons led to my development of GrowCommon.</p>
      
      <h2>Why I Started GrowCommon: Accessing Everyone to Garden</h2>
      <p>After a few years of experiencing these changes firsthand, I began to share my experiences more. People who struggled from anxiety began asking for advice. My colleague, who had ADHD, asked how to get involved. Our parenting group, whose members have autistic children, began asking for advice.</p>
      <p>I quickly discovered that a truth about gardens is that garden therapy is a known benefit, but a lack of good information is a problem. Most books and websites about gardens assume you already know what you're doing. They're geared towards seniors who have endless time. None of them cater to folks trying to cope.</p>
      <p>GrowCommon was a very simple concept: what if there was a gardening tool that was for people like me? People who lived in Frederick County, Maryland, who had a zone of 6b-7a who needed exactly planting dates. People who had questions that required exacting, not generalized, responses. People who had health issues that required flexibility, rather than after-thoughts.</p>
      <p>I was trying to make something that:</p>
      <ul>
        <li>Removes barriers: Plain, understandable, non-technical information</li>
        <li>Offers local relevance: Planting schedules for Frederick County, weather warnings, adaptive varieties</li>
        <li>Creates a Sense of Community: Networking opportunities on a platform that also understands different viewpoints</li>
        <li>It celebrates small victories. It recognizes that sometimes, harvesting three cherry tomatoes from a backyard plant can be a monumental task.</li>
        <li>Acknowledges challenges: Real advice for real limitations</li>
      </ul>
      <p>GrowCommon is for people living with Tourette's. It's for anyone who's ever felt frustrated by modern-day gardening materials. For anyone who requires or prefers accommodations. For anyone who's found or wants to find that growing something can be a form of therapy.</p>
      <p>It offers functions that I wish had existed when I began:</p>
      <ul>
        <li>My Garden tracker: Track Your Progress & Record Your Observations!</li>
        <li>Weather integration: Not because stress about frost is good</li>
        <li>Plant index: Designed for Zone 6b-7a, with accurate difficulty levels</li>
        <li>Calendar Reminders: Organization Without Convention</li>
        <li>Community sharing: Learn from others without judging</li>
      </ul>
      <p>This is for, you know, me back then, standing in the garden center, absolutely overwhelmed and wondering where to even begin, wondering if this "gardening" thing is something that can help me, but never actually knowing where to start.</p>
      <p>If that sounds like you, welcome. You're in the right place.</p>
      
      <h2>Resources and Support: You're Not Alone</h2>
      <p>If you're interested in horticultural therapy, these sources were good places for me to begin:</p>
      <h3>Professional Associations</h3>
      <ul>
        <li>American Horticultural Association – HortTherapy.org</li>
        <li>Tourette Association of America, Resources for alternative treatments, and lifestyle management</li>
        <li>Local Extension Services: The University of Maryland Extension offers free gardening advice that is local to our area</li>
      </ul>
      <h3>Starting Your Journey</h3>
      <ul>
        <li>Connect locally: Look for local community gardens, therapy gardens, or garden clubs in Frederick County</li>
        <li>Join GrowCommon: Our community is designed for this type of help</li>
        <li>Day One: Plant a seed in a pot. Only one. Observe what happens</li>
        <li>Talk to your medical group: Mention adding gardening to your health routine</li>
      </ul>
      <h3>Books that Helped Me</h3>
      <ul>
        <li><em>The Well-Gardened Mind</em> by Sue Stuart-Smith</li>
        <li><em>Garden Therapy</em> by Megan Munoz</li>
        <li><em>Grounded in Hope</em> by Kathryn Nelson Smith and Cindy Krebs</li>
      </ul>
      <p>Remember this: Gardening is a process, not a goal. It's some days better than others. You're gonna kill some plants. You're gonna make mistakes. However, each tiny step you take in your own garden, from planting a seed to pulling a weed, is a step towards improved well-being for you. Your garden doesn't give a rip if you happen to have Tourette's, anxiety, depression, ADHD, chronic pain, or whatever else is going on. It's simply happy that you're there. And being there, much to my surprise, is enough.</p>
      
      <h2>A Final Thought</h2>
      <p>That's the quality of that first experience, of that first July morning when I was aware of the difference—a quiet mind, relaxed shoulders, total involvement in the act of planting tomato seeds. It was just the beginning of a practice that has brought me much more than I could have imagined.</p>
      <p>I still have Tourette's. I still have bad days. The garden hasn't cured anything. It's given me a space of my own where I belong just the way I am. Where my hands can be of service, my gaze can settle, my mind can calm. Where something is living because I am a part of its growing.</p>
      <p>If you're looking for a place of that sort, I hope you can dig. It is waiting, and it neither judges nor condemns.</p>
      <p>Are you ready to begin your own gardening experience? Join the GrowCommon community and find out what you can grow when you give yourself permission to start.</p>
    `,
    author: 'Maxwell Liu',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Horticultural Therapy',
    readTime: '15 min read',
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=500&fit=crop&q=80',
    slug: 'horticultural-therapy-tourettes'
  },
  'best-vegetables-maryland-zone-6b-7a': {
    id: '3',
    title: 'Best Vegetables to Grow in Maryland: Top 10 Picks for Zone 6b-7a',
    content: `
      <h2>Introduction</h2>
      <p>Maryland's Zone 6b-7a climate offers excellent growing conditions for a wide variety of vegetables. Here are our top 10 picks that consistently perform well in Frederick County gardens.</p>
      
      <h2>1. Tomatoes</h2>
      <p>Tomatoes are the most popular garden vegetable for good reason. In Maryland, start seeds indoors in March and transplant after the last frost. Cherry tomatoes are especially reliable for beginners.</p>
      
      <h2>2. Peppers</h2>
      <p>Both sweet and hot peppers thrive in our warm summers. Start indoors in early March and transplant in May. They love the heat and will produce until frost.</p>
      
      <h2>3. Leafy Greens</h2>
      <p>Lettuce, spinach, and kale are perfect for our climate. Plant in early spring and again in late summer for a fall harvest. They prefer cooler temperatures.</p>
      
      <h2>4. Beans</h2>
      <p>Green beans are incredibly productive and easy to grow. Direct sow after the last frost. Bush beans are great for small spaces, while pole beans maximize vertical space.</p>
      
      <h2>5. Squash</h2>
      <p>Summer squash like zucchini are famously productive. Just plant 1-2 plants—they'll produce more than you can eat! Winter squash like butternut store well through winter.</p>
      
      <h2>6. Cucumbers</h2>
      <p>Perfect for our hot summers. Plant after the last frost and provide a trellis for support. Great for fresh eating and pickling.</p>
      
      <h2>7. Carrots</h2>
      <p>Root vegetables love our well-draining soil. Plant in early spring for summer harvest or late summer for fall harvest. Loose, sandy soil is ideal.</p>
      
      <h2>8. Broccoli</h2>
      <p>This cool-season crop does well when planted in early spring or late summer. It's a heavy feeder, so amend soil with compost.</p>
      
      <h2>9. Radishes</h2>
      <p>The fastest-growing vegetable—ready in just 25-30 days! Great for interplanting with slower-growing crops. Plant throughout the season.</p>
      
      <h2>10. Herbs</h2>
      <p>Basil, oregano, thyme, and rosemary all thrive in Maryland. Most are perennials that will return year after year. Perfect for container gardening too.</p>
      
      <h2>Growing Tips</h2>
      <ul>
        <li>Test your soil pH and amend as needed</li>
        <li>Add compost to improve soil structure</li>
        <li>Use mulch to retain moisture and suppress weeds</li>
        <li>Water consistently, especially during hot summers</li>
        <li>Rotate crops annually to prevent disease</li>
      </ul>
    `,
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Vegetable Gardening',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=500&fit=crop&q=80',
    slug: 'best-vegetables-maryland-zone-6b-7a'
  },
  'native-plants-frederick-county': {
    id: '4',
    title: 'Native Plants for Frederick County: Supporting Local Ecosystems',
    content: `
      <h2>Why Native Plants Matter</h2>
      <p>Native plants are species that have evolved in our region over thousands of years. They're perfectly adapted to our climate, soil, and local wildlife, making them easier to grow and more beneficial for the environment.</p>
      
      <h2>Benefits of Native Gardening</h2>
      <ul>
        <li><strong>Low Maintenance:</strong> Once established, native plants require less water and care</li>
        <li><strong>Wildlife Support:</strong> Provide food and habitat for local birds, butterflies, and pollinators</li>
        <li><strong>Disease Resistance:</strong> Naturally adapted to resist local pests and diseases</li>
        <li><strong>Water Conservation:</strong> Deep root systems help prevent erosion and improve water infiltration</li>
      </ul>
      
      <h2>Top Native Plants for Frederick County</h2>
      <h3>Perennials</h3>
      <ul>
        <li><strong>Black-Eyed Susan:</strong> Bright yellow flowers, blooms summer to fall</li>
        <li><strong>Purple Coneflower:</strong> Attracts butterflies and birds, drought tolerant</li>
        <li><strong>Wild Bergamot:</strong> Aromatic leaves, attracts hummingbirds</li>
        <li><strong>Cardinal Flower:</strong> Striking red flowers, loves moist areas</li>
      </ul>
      
      <h3>Trees and Shrubs</h3>
      <ul>
        <li><strong>Redbud:</strong> Beautiful spring flowers, small tree perfect for yards</li>
        <li><strong>Serviceberry:</strong> Edible berries, great for wildlife</li>
        <li><strong>Spicebush:</strong> Host plant for swallowtail butterflies</li>
        <li><strong>Elderberry:</strong> Edible berries, important for birds</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Start by replacing a small section of your garden with native plants. Choose plants that match your site conditions—sun exposure, soil type, and moisture levels. Local nurseries often carry native plants, or you can order from native plant specialists.</p>
      
      <h2>Creating a Native Garden</h2>
      <p>Design your native garden to mimic natural plant communities. Group plants with similar needs together, and include a variety of heights and bloom times to support wildlife throughout the season.</p>
    `,
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Native Plants',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop&q=80',
    slug: 'native-plants-frederick-county'
  },
  'companion-planting-guide': {
    id: '5',
    title: 'Companion Planting Guide: Maximize Your Garden\'s Potential',
    content: `
      <h2>What is Companion Planting?</h2>
      <p>Companion planting is the practice of growing certain plants together to benefit each other. This ancient technique can improve yields, deter pests, and create a more productive garden.</p>
      
      <h2>Benefits of Companion Planting</h2>
      <ul>
        <li><strong>Pest Control:</strong> Some plants naturally repel pests</li>
        <li><strong>Pollination:</strong> Attract beneficial insects</li>
        <li><strong>Space Efficiency:</strong> Maximize garden space</li>
        <li><strong>Soil Health:</strong> Some plants fix nitrogen or improve soil structure</li>
        <li><strong>Shade and Support:</strong> Tall plants can provide shade for shade-loving crops</li>
      </ul>
      
      <h2>Classic Companion Combinations</h2>
      <h3>Three Sisters</h3>
      <p>The traditional Native American combination of corn, beans, and squash. Corn provides support for beans, beans fix nitrogen, and squash shades the soil.</p>
      
      <h3>Tomatoes and Basil</h3>
      <p>Basil repels tomato hornworms and improves tomato flavor. Plant basil around tomato plants.</p>
      
      <h3>Carrots and Onions</h3>
      <p>Onions repel carrot flies, while carrots may help deter onion pests. Interplant these in rows.</p>
      
      <h3>Lettuce and Radishes</h3>
      <p>Fast-growing radishes can be harvested before lettuce needs the space. Plant radishes between lettuce rows.</p>
      
      <h2>Plants to Avoid Planting Together</h2>
      <ul>
        <li>Tomatoes and potatoes (same family, share diseases)</li>
        <li>Beans and onions (onions can inhibit bean growth)</li>
        <li>Carrots and dill (dill can attract pests harmful to carrots)</li>
      </ul>
      
      <h2>Planning Your Companion Garden</h2>
      <p>When planning your garden, consider plant heights, root depths, and growth rates. Use companion planting charts as a guide, but also experiment to see what works best in your specific garden conditions.</p>
    `,
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Garden Planning',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&q=80',
    slug: 'companion-planting-guide'
  },
  'soil-health-testing-amending': {
    id: '6',
    title: 'Soil Health 101: Testing and Amending Your Garden Soil',
    content: `
      <h2>Why Soil Health Matters</h2>
      <p>Healthy soil is the foundation of a successful garden. Good soil provides nutrients, holds water, and supports beneficial microorganisms that help plants thrive.</p>
      
      <h2>Testing Your Soil</h2>
      <h3>pH Testing</h3>
      <p>Most vegetables prefer a pH between 6.0 and 7.0. You can test pH with a simple home test kit or send a sample to your local extension office for professional analysis.</p>
      
      <h3>Nutrient Testing</h3>
      <p>Professional soil tests measure nitrogen, phosphorus, potassium, and other essential nutrients. This helps you know exactly what amendments your soil needs.</p>
      
      <h2>Understanding Soil Types</h2>
      <ul>
        <li><strong>Clay Soil:</strong> Holds water well but drains slowly. Add organic matter to improve drainage.</li>
        <li><strong>Sandy Soil:</strong> Drains quickly but doesn't hold nutrients. Add compost to improve water retention.</li>
        <li><strong>Loamy Soil:</strong> The ideal balance of sand, silt, and clay. This is what you're aiming for!</li>
      </ul>
      
      <h2>Amending Your Soil</h2>
      <h3>Adding Organic Matter</h3>
      <p>Compost is the best all-around soil amendment. It improves drainage in clay soils, water retention in sandy soils, and adds nutrients. Add 2-3 inches of compost annually.</p>
      
      <h3>Adjusting pH</h3>
      <p>To raise pH (make more alkaline): Add lime. To lower pH (make more acidic): Add sulfur or peat moss.</p>
      
      <h3>Adding Nutrients</h3>
      <p>Based on your soil test, you may need to add specific fertilizers. Organic options include compost, manure, bone meal, and fish emulsion.</p>
      
      <h2>Building Healthy Soil Over Time</h2>
      <p>Soil health improves gradually. Focus on adding organic matter regularly, avoiding compaction, and rotating crops. Your soil will get better each year!</p>
    `,
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Soil Health',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=500&fit=crop&q=80',
    slug: 'soil-health-testing-amending'
  },
  'container-gardening-small-spaces': {
    id: '8',
    title: 'Container Gardening for Small Spaces: Grow Food Anywhere',
    content: `
      <h2>Why Container Gardening?</h2>
      <p>Container gardening makes it possible to grow food anywhere—apartments, patios, balconies, or small yards. It's perfect for renters, urban dwellers, or anyone with limited space.</p>
      
      <h2>Choosing Containers</h2>
      <ul>
        <li><strong>Size Matters:</strong> Larger containers hold more water and give roots room to grow</li>
        <li><strong>Drainage is Essential:</strong> All containers must have drainage holes</li>
        <li><strong>Material Options:</strong> Plastic, ceramic, fabric, or wood all work well</li>
        <li><strong>Consider Weight:</strong> Large containers filled with soil are heavy—plan for placement</li>
      </ul>
      
      <h2>Best Vegetables for Containers</h2>
      <ul>
        <li><strong>Lettuce and Greens:</strong> Shallow roots, fast growing</li>
        <li><strong>Radishes:</strong> Small and quick</li>
        <li><strong>Herbs:</strong> Perfect for small pots on windowsills</li>
        <li><strong>Tomatoes:</strong> Use large containers (5+ gallons) and provide support</li>
        <li><strong>Peppers:</strong> Compact varieties work great in containers</li>
        <li><strong>Beans:</strong> Bush varieties are perfect for containers</li>
      </ul>
      
      <h2>Container Soil Mix</h2>
      <p>Don't use garden soil in containers—it's too heavy and may contain pests. Use a quality potting mix that's light, well-draining, and contains organic matter.</p>
      
      <h2>Watering Container Gardens</h2>
      <p>Containers dry out faster than garden beds. Check daily and water when the top inch of soil is dry. Self-watering containers can help reduce watering frequency.</p>
      
      <h2>Fertilizing</h2>
      <p>Container plants need regular fertilizing since nutrients wash out with watering. Use a balanced liquid fertilizer every 2-3 weeks during the growing season.</p>
      
      <h2>Maximizing Small Spaces</h2>
      <p>Use vertical space with trellises, stack containers, and choose compact varieties. Many vegetables have dwarf or bush varieties perfect for containers.</p>
    `,
    author: 'GrowCommon Team',
    publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Container Gardening',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&h=500&fit=crop&q=80',
    slug: 'container-gardening-small-spaces'
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts[params.slug as string];

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          onError={(e) => {
            // Fallback to placeholder if image fails
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">By {post.author}</span>
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:text-foreground
            prose-p:text-muted-foreground
            prose-strong:text-foreground
            prose-ul:text-muted-foreground
            prose-ol:text-muted-foreground
            prose-li:text-muted-foreground
            prose-a:text-primary
            prose-a:no-underline
            hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Share this article:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.title,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-8">
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              View All Articles
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
