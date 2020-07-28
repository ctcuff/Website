const projects = [
  {
    title: 'UCF Parking',
    description: 'A website and API to keep track of parking spaces.',
    backgroundImage: require('./assets/images/ucf-parking-fullscreen.png'),
    foregroundImage: require('./assets/images/ucf-parking.png'),
    imageAlt: 'UCF parking website screenshot',
    link: '/project?index=0'
  },
  {
    title: 'Live Code',
    description: 'A site that lets people code together.',
    backgroundImage: require('./assets/images/livecode-fullscreen.png'),
    foregroundImage: require('./assets/images/livecode.png'),
    imageAlt: 'Live code website screenshot',
    link: '/project?index=1'
  },
  {
    title: 'Dependency Visualizer',
    description: "View a graph of a JavaScript package's dependencies from npm.",
    backgroundImage: require('./assets/images/dependency-visualizer-fullscreen.png'),
    foregroundImage: require('./assets/images/dependency-visualizer.png'),
    imageAlt: 'Dependency visualizer website screenshot',
    link: '/project?index=2'
  },
  {
    title: 'Portfolio',
    description: 'This very website and how I approach projects.',
    backgroundImage: require('./assets/images/portfolio-fullscreen.png'),
    foregroundImage: require('./assets/images/portfolio.png'),
    imageAlt: 'Portfolio website screenshot',
    link: '/project?index=3'
  }
]

const projectData = [
  {
    title: 'UCF Parking',
    image: {
      src: require('./assets/images/ucf-parking.png'),
      alt: 'UCF Parking Website'
    },
    links: {
      github: 'https://github.com/ctcuff/UCFParking-API',
      website: 'https://ucfgarages.com'
    },
    sections: [
      {
        heading: 'Taking the guess work out of parking',
        text: `
          University of Central Florida is a massive college. With over 65,000 people and
          only 7 parking garages, you can imagine how difficult it is at times to find a
          parking space. Thankfully, we have a website that shows students how full each garage is.
          The problem: it doesn't show past days, and there's no public API for it. UCF Parking is a
          website (and API) that allows anyone to see how full each of UCF's 7 garages were at the top
          of each hour. With over 13,000 data points, it's now easier that ever to determine where
          to park.`
      },
      {
        heading: 'How it works',
        text: `
          What originally started as a Python script that would only run while my computer
          was on soon turned into a full fledged API! But how you might ask? Let's break
          down this project into smaller problems. I wanted a way to automatically scrape
          data at set intervals, save that data, query that data, and display that data. A
          few things came to mind to solve these problems: Python, MongoDB, Vue, and Heroku.
          Every hour, Heroku runs a command that tells a Python server to scrape UCF's
          website. The data it scrapes is saved as JSON into a MongoDB database. Vue comes
          along, asks that Python server for some data, and displays it with some fancy
          charts.`
      },
      {
        heading: 'What I learned',
        text: `
          Some of the biggest things I learned from this project are HTTP response codes,
          search queries, and deployment. Sure, I could just return some data or an error
          message, but it's important to know the difference between a 200 and a 418 status
          code. Then there's the query. I had to learn how to ask my API for specific data
          efficiently. What if someone queries for only one garage, or maybe all 7? Lastly,
          and probably most importantly, deployment. Heroku is my all time favorite hosting
          platform. I learned about their monitoring system and was able to reduce my
          project's memory usage and response time because of it. They even offer continuous
          integration and deployment, so pushing the next version of my site is as easy as
          pushing to a branch on GitHub.`
      }
    ]
  },
  {
    title: 'Live Code',
    image: {
      src: require('./assets/images/livecode.png'),
      alt: 'Live code website'
    },
    links: {
      github: 'https://github.com/ctcuff/LiveCode',
      website: 'https://ctcuff.github.io/LiveCode/'
    },
    sections: [
      {
        heading: 'Write code together',
        text: `
        Imagine this: you've got your coding interview scheduled. It's online. You're
        excited because you finally get to showcase your coding skills. The time comes.
        You get the link. You open up the website... and you're asked to write
        code on Google Docs... yikes... Wouldn't it be nice to write code in your browser,
        like you do with VSCode? Well fear not! LiveCode is a website that lets you write
        code with other people. Just sign in, connect to a workspace, and code like you
        never even left your text editor.`
      },
      {
        heading: 'How it works',
        text: `
          Sockets! After signing in, you'll be able to connect to another
          users' workspace or have others connect to yours. It works by broadcasting changes made
          to your online editor to other users connected to your workspace using a library called
          socket.io. A tiny NodeJS server handles socket events to ensure content is only broadcast
          to users in the proper room. Google's Firebase is used to determine when users are online,
          offline, or when a user gains and looses internet connection. To avoid broadcasting the
          entire content of the editor on every keystroke, all the text in the editor is only
          broadcast when a user first joins. Subsequent broadcasts contain only new characters
          inserted and the line number/position of those characters. This equates to a better user
          experience and less data transferred.`
      },
      {
        heading: 'What I learned',
        text: `
          In JavaScript, there's a library for everything. One of the biggest things I
          learned from this project was not to re-invent the wheel. There's a time when re-inventing
          existing solutions is a good idea (you learn stuff in the process), but implementing user
          authentication from scratch is not one of those times. Integrating Google's Firebase SDK,
          I learned how to authenticate users with their Github and Google account, and I learned
          how to implement Firebase security rules, preventing outside users from accessing
          information they shouldn't have access to. Because a large part of the project was front
          end, I learned a ton about material components, color, and responsive design. Yes,
          I did have to Google "How to center a div" a few times... cut me some slack ok...`
      }
    ]
  },
  {
    title: 'Dependency Visualizer',
    image: {
      src: require('./assets/images/dependency-visualizer.png'),
      alt: 'Dependency visualizer website'
    },
    links: {
      github: 'https://github.com/ctcuff/dependency-visualizer',
      website: 'https://ctcuff.github.io/dependency-visualizer/'
    },
    sections: [
      {
        heading: `A graph of a package's dependencies`,
        text: `
          If you've ever used JavaScript, odds are, at some point, you've typed:
          npm install <package>. One day, you decide to take a peek at your node_modules
          folder and HOLY CRAP. It's FILLED with a bunch of sub folders! "is-even"? Did you even
          install that? Do you really need "is-number"? Dependency Visualizer is a website that
          lets you view a graph of every dependency a package relies on. It also
          shows you the stats of said package (assuming they're available). Did you know
          that "is-number" has been downloaded 126,000,000 times? And to think I barely passed
          my math class...`
      },
      {
        heading: 'How it works',
        text: `
          This project makes heavy use of JavaScript promises and the npm registry API. When
          you search for a package, the registry API is queried and a list of that package's
          dependencies are returned. For every dependency that's returned, another query is made
          until there are no more dependencies left to search. To prevent the search from taking
          forever, queries are made asynchronously and added to a stack of promises. Think of
          it like washing dirty dishes. When you finish washing a dirty dish, you take it off the
          unclean stack and put it on another stack to dry. When there are no more dirty dishes,
          what you have left is a stack of clean dishes. Using a graphing library, each dependency
          is saved as parent node and child nodes. This allows every dependency to be rendered
          with lines pointing to what packages rely on each other.`
      },
      {
        heading: 'What I learned',
        text: `
          That data structures class I took in college finally payed off. I had to think of a fast
          and efficient way of querying data and displaying data. I needed to be able to make
          hundreds of requests without waiting for each individual request to complete before starting
          the next one. I also needed a way to visualize the data. This led me to using stacks and queues
          for network requests and a graph to display dependencies. Another problem I faced was making
          sure I didn't keep making the same request. To solve this, I implemented my own cache using
          the browser's local storage. This way, once a request has been made, subsequent look-ups
          become much faster. This project was ultimately a huge lesson in writing efficient code.`
      }
    ]
  },
  {
    title: 'Portfolio',
    image: {
      src: require('./assets/images/portfolio.png'),
      alt: 'Portfolio website'
    },
    links: {
      github: 'https://github.com/ctcuff/ctcuff.github.io'
    },
    sections: [
      {
        heading: `Hey look its my website`,
        text: `
          So, the screenshot might be kind of misleading. It's an earlier version
          of this site. Generally, what I like to do is redesign the site every once
          a while to keep me on my toes and help me learn about design and other things.
          This website started back in 2017 as a single page glued together with some
          jQuery and Bootstrap sprinkled in. To be honest, I had no idea what I was doing...
          (I still don't). In early 2018, I decided to ditch jQuery for React and
          remade the site, keeping the origin Bootstrap look. It sure looked tacky, but
          it got the job done. When 2019 hit, I wanted to learn Vue so I completely
          redesigned the site, ditched Bootstrap, and decided to go with vanilla CSS/SCSS
          for everything (that's the screenshot you see above). Today, I'm still using Vue,
          but I continue to style the site from scratch. I think it gives me a much better
          appreciation for CSS and gets those creative juices flowing.`
      },
      {
        heading: 'The approach',
        text: `
          When I get an idea for a project, one of the first things I do is look to
          others for design inspiration. Whenever when I see a website that looks nice,
          I bookmark it, pop open my text editor, create a simple HTML and CSS file, and try to
          redesign parts of it from scratch. I always start simple, try to recreate a
          cool button hover effect or even something as simple as a shaped element.
          When I get stuck, I open up Chrome's dev tools and checkout the site's styling
          to see how they did it. Doing this helps me see that there's never just one way to
          do anything and I get to learn how other developers think in the process. It
          makes me realize just how much I don't know.`
      },
      {
        heading: 'How I build a project',
        text: `
          Ok, I swear I do more than just make websites... Whenever I have an idea,
          (as idiotic as it may be), I jot it down and save it to a list of future projects.
          The idea here is that there's no such thing as a bad idea. The way I see it, if you
          learned something in the process, then that project has value. So, when I decide on
          what to make, I start by planning out what the project should do. What's the core
          functionality? Does it have a target audience? I map out the basic features so I
          have something to build off of. If this project is something an end user is going to
          be staring at, like a website, or anything with a UI, I think about how it should look.
          Like I mentioned earlier, I love to steal, uh, I mean, borrow, ideas from other sites.
          I might whip out my good pals pencil & paper and sketch something simple, crooked lines
          and all. Alright, so I have the project idea, the functionality, and some mock-ups, next
          comes the fun part: building it. I try not to just jump straight to my favorite framework
          or programming language. Instead, I try to look at expanding my knowledge. Maybe there's
          a hot new framework. Maybe I hear somewhere that language X is rising in popularity.
          When the project is finished, I think about what could be better and try to improve upon it.
          Maybe there's a database request I can try and optimize. Maybe there's a component I can
          try and make more accessible. Maybe there are some tiny features that could be added.`
      },
      {
        heading: 'What I learned',
        text: `
          There are no bad ideas, projects are important, and writing CSS is fun. Seriously.
          I used to shy away from CSS because it seemed super complex. After taking a bit of
          time to understand what CSS could do, it actually piqued my interest. Projects are
          important too. It's not about showcasing your skills or proving you can write Facebook
          in 10 lines of code, it's about what you learn in the process. Making projects, I've
          learned how to design from scratch, how to work with other developers, how to create
          REST APIs, how to deploy and host applications, how to debug, how to work with databases,
          I mean, the list is endless.
        `
      }
    ]
  }
]

export { projects, projectData }
