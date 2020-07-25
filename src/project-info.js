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
          few things came to mind to solve these problems: Vue, Python, MongoDB, and Heroku.
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
          project's memory usage and response time because of it. The even offer continuous
          integration and deployment, so pushing the next version of my side is as easy as
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
        excited because you finally get to showcase you coding skills. The time comes.
        You get the link. You open up the website... and you're asked to write
        code on Google doc... yikes... Wouldn't it be nice to write code in your browser,
        like you do with VSCode? Well fear not! LiveCode is a website that lets you write
        code with other people. Just sign in, connect to a workspace, and code like you
        never even left your text editor.`
      },
      {
        heading: 'How it works',
        text: `
          Sockets! After signing in, you'll be able to connect to another
          users workspace or have others connect to yours. It works by broadcasting changes made
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
          folder and HOLY CRAP. It's FILLED with a bunch of sub folders! "is-even"? Did I even
          install that? Do I really need "is-number"? Dependency Visualizer is a website that
          lets you recursively view a graph of every dependency a package relies on. It also
          shows you the stats of said package (assuming they're available). Did you know
          that "is-number" has been downloaded 126,000,000 times? And to think I barely passed
          calculus...`
      },
      {
        heading: 'How it works',
        text: `
          This project makes heavy use of JavaScript promises, and the npm registry API. When
          you search for a package, the registry API is queried, and a list of that package's
          dependencies are returned. For every dependency that's returned, another query is made
          until there are no more dependencies left to search. To prevent the search from taking
          forever, queries are made asynchronously and added to a stack of promises. Think of
          it like washing dirty dishes. When you finish washing a dirty dish, you take it off the
          unclean stack and put it on another stack to dry. When there are no more dirty dishes,
          what you have left is a stack of clean dishes. Using a graphing library, each dependency
          is saved as parent node a children nodes. This allows every dependency to be rendered,
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
  }
]

export { projects, projectData }
