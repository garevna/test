/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {
  browserTabTitle: 'Ultra-Fast Fibre',
  emailSubject: 'Ultra-Fast Fibre To Your Home',
  emailText: 'Thank you for your interest in Pineapple NET! A member of our team will be in touch shortly.',
  mainNavButtons: ['Reviews', 'Get in Touch', 'FAQs'],
  mainNavSectors: ['#testimonials', '#contact', '#faq'],
  top: {
    header: 'Ultra-Fast Fibre Now Available!',
    text: 'Pineapple Net’s full-fibre is the internet Melbourne’s been missing. Faster, cheaper and more reliable than your NBN.<br>Now that it’s reached your building, connect and get your first month for FREE. Offer available in Melbourne’s CBD highrise apartments: The Aurora, Conversatory and QV1.',
    button: 'Get in Touch',
    pictureURL: 'https://pineapple-net-land.glitch.me/images/family-medium-1.png'
  },
  info: {
    header: '40% Cheaper, 100% Faster than your current connection',
    text: 'Nothing beats fibre. Get the best internet connection for HD movies and 4K streams, remote-work and crystal clear video calls. Unwind with lag-free-games, and accelerated web-surfing. Now, you can feel good about your internet connection thanks to our superior-tech and the unrivalled reliability of ultra-fast fibre.<br>Check your building app to get your promo code for 1 month of FREE internet!',
    offer: [
      {
        blackText: 'Up to 1Gbps',
        greenText: 'Speeds'
      },
      {
        blackText: 'Business-worthy uploads',
        greenText: 'Uploads'
      },
      {
        blackText: 'for every screen',
        greenText: 'Bandwidth'
      }
    ]
  },
  userForm: {
    title: 'Ask Questions Or Get Connected Today',
    messagePlaceholder: 'Enquiry*',
    button: 'Ask Questions Or Get Connected',
    fieldsToShow: ['name', 'email', 'phone', 'building', 'apptNumber', 'promocode', 'message']
    // fieldsToShow: ['name', 'email', 'address', 'postcode', 'state', 'phone', 'building', 'apptNumber', 'promocode', 'message']
  },
  howToConnect: {
    header: 'Fibre Optics. The Futureproof Internet Melbourne Needed Yesterday',
    text: '',
    items: [
      {
        title: 'Stream Like You Own It',
        text: 'Live it up with 4K Netflix on every screen in the house. No congestion to slow you down or data caps to stop you.'
      },
      {
        title: 'Game in Real-Time',
        text: 'Low latency and unmatched reliability lowers the artificial reaction time constraints and gives you an edge.'
      },
      {
        title: 'Video-Call Like You’re There',
        text: 'Symmetrical uploads speed as fast as your downloads, inject clarity into your Zoom and FaceTime calls. You’ll communicate without skips, splutters or pauses.'
      }
    ]
  },
  testimonials: {
    header: 'The Social Proof That Melbourne Loves Pineapple Fibre',
    button: 'Try it for yourself'
  },
  faq: {
    header: 'We’ve Answered Some Common Questions',
    button: 'Get in Touch',
    items: [
      {
        question: 'How is DGtek Fibre Different to the NBN?',
        answer: `Let’s make one thing very clear, DGtek is not the NBN.<br>
                 DGtek is an independent fibre infrastructure provider local to Melbourne.<br>
                 Pineapple Net retails DGtek, not the NBN.<br>
                 While the NBN connects customers with 7 different technologies, DGtek only uses fibre to the home.<br>
                 DGtek fibre is the same technology that is used across Europe, Japan, New Zealand, and it’s what Google used in their US rollout.<br>
                 <li style='text-indent: 25px'>• Fibre is capable of faster speeds - Up to 10Gbps</li>
                 <li style='text-indent: 25px'>• Fibre is stronger- less prone to breakage and doesn’t require as much maintenance</li>
                 <li style='text-indent: 25px'>• Fibre performs better in hot temperatures and over long distances</li>
                 By every metrics, fibre is the superior technology for delivering internet to Melbourne’s homes.<br>
                 In addition to DGtek’s infrastructure using better technology, their cables are only 3 - 5 years old.<br>
                 The average piece of NBN copper is 30 years old.<br>
                 Australian internet really is in a sorry state.  Our National Broadband Network is mostly Telstra and Optus’s old Telephone and PayTV cables repurposed.<br>
                 That’s why the whole nation is plagued by network outages, and it’s why DGtek fibre is unmatched for reliability.
        `
      },
      {
        question: 'How is Pineapple Net Cheaper Than Every Other Internet Provider?',
        answer: `DGtek is cheaper for us to retail.<br>
                 As a new Aussie ISP, we’d struggle to retail the NBN. Unless your one of the big players, the so-called “open access” NBN is practically inaccessible.<br>
                 We pass these savings down to our customers.<br>
                 That’s why our 50Mbps plan is the cheapest on the market.<br>
                 And why our 150Mbps plan is less than any NBN 100 plan, although 50Mbps faster for downloads and 110Mbps faster for uploads.<br>
        `
      },
      {
        question: 'What are Symmetrical Speeds?',
        answer: `Symmetrical speeds are when your upload speeds are as fast as your download speeds.<br>
                 That means that a plan with 500Mbps download has 500Mbps uploads.<br>
                 You’ve probably noticed that all RSPs retailing the NBN talk about their downloads a lot more than their uploads. That’s because NBN uploads are a lot slower for residential connections.<br>
                 100Mbps/40Mpbs --- 100Mbps download --- 40Mbps upload.<br>
                 While Pineapple Net retails symmetrical speeds.<br>
                 We do this because it’s easy. There is so much extra bandwidth with a full-fibre connection that we don’t need to limit our uploads. And we know it’s helpful for the work from home crowd, social and business video calls and will even save people time when they upload to social media.
        `
      },
      {
        question: 'What Can I Do With Fibre? ',
        answer: `Nothing you couldn’t do with your NBN connection. It’s just an all-round better experience. You can download large files quicker, stream in higher resolutions, upload massive files in a fraction of the time and of course, fibre is way more reliable so you won’t drop calls to your work colleagues or loved ones.<br>
                 There is no evening congestion, no unexplainable internet slow days and practically no network outages.<br>
                 Since DGtek launched their fibre in 2016, our customers have enjoyed 99.9% network uptime. Years have passed without a single dropout. That feat is unthinkable on the NBN.
        `
      }
    ]
  },
  footer: {
    topHead: 'READY TO GET STARTED?',
    topText: "Leave your inquiry and we'll get back to you within 24 hours on business days"
  }
}

const getters = {
  contentEndpoint: (state, getters, rootState) => `${rootState.host}/content/2`,
  testimonialsEndpoint: (state, getters, rootState) => `${rootState.host}/testimonials`
}

const mutations = {
  UPDATE_ALL: (state, payload) => {
    Object.assign(state, payload)
  }
}

const actions = {
  async GET_DATA ({ getters, commit }) {
    // const content = await (await fetch(getters.contentEndpoint)).json()
    // commit('UPDATE_ALL', content)
    return state.browserTabTitle
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
