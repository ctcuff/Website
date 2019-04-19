const bold = (text) => `[[b;;]${text}]`;

const createManPage = (command, description, usage) =>
  `${bold('NAME')}\n` +
  `    ${command} - ${description}\n` +
  `${bold('USAGE')}\n` +
  `    ${usage.join('    ')}`;

const projects = {
  projects: [
    {
      name: 'Tweety-Android',
      description: 'An android app that tracks keywords from Twitter in real time (she said WHAT?!?)',
      languages: ['Java', 'Kotlin'],
      source: 'https://github.com/ctcuff/Tweety-Android'
    },
    {
      name: 'MotionPy',
      description: "A motion detection system for a RaspberryPi 3 along with an Android app to control it.",
      languages: ['Python, Kotlin'],
      source: 'https://github.com/ctcuff/MotionPy'
    },
    {
      name: 'UCFParking-API',
      description: "An API / Website that shows how full each garage was at each hour everyday.",
      languages: ['Javascript', 'Python'],
      source: 'https://github.com/ctcuff/UCFParking-API'
    }
  ]
};

const commands = {
  ls: ['about.txt', 'contact.txt', 'languages.txt', 'projects.json', 'README.md'],
  about:
    "I'm currently a Sophomore from Jacksonville, Florida studying Computer " +
    "Science at the University of Central Florida. I've always had an interest " +
    "in making things, breaking things, and failing at things just the right amount " +
    "of times until it finally clicks.\n",
  contact:
    'Email: dev.ctcuff@gmail.com\n' +
    'GitHub: https://github.com/ctcuff\n' +
    'LinkedIn: https://www.linkedin.com/in/cameron-cuff-126405161/',
  languages: 'Java (Most comfortable)    Python     Kotlin     Javascript (still learning)',
  readme:
    '# Welcome to my site! Type `help` to see an available list of commands.\n' +
    "# Might I recommend running `cat about.txt`?\n" +
    "# Oh, how about `ls`? That's a good one too!\n",
  man_no_args: 'What manual page do you want?',
  error_msg: (command) => `${command}: command not found`,
  projects: () => JSON.stringify(JSON.parse(JSON.stringify(projects)), null, 2),
  cat:
    function (file_name) {

      if (file_name === '')
        return 'cat: Expected filename';

      for (let file of this.ls) {
        if (file_name.toLowerCase() === file.toLowerCase()) {
          return this[file_name.toLowerCase().split('.')[0]];
        }
      }

      return `cat: ${file_name}: No such file or directory`
    },
  time: () => new Date(),
  source:
    function (name = '') {
      if (name === '') {
        window.open('https://github.com/ctcuff/ctcuff.github.io', '_blank');
        return '';
      }

      if (name.toLowerCase() === 'tweety-android') {
        window.open(projects.projects[0].source, '_blank');
        return '';
      } else if (name.toLowerCase() === 'alexaclassscheduler') {
        window.open(projects.projects[1].source, '_blank');
        return '';
      } else if (name.toLowerCase() === 'ucfparking') {
        window.open(projects.projects[2].source, '_blank');
        return '';
      } else {
        return `${name} not recognized as a GitHub source. Is it included in [[u;;]projects.json]?`
      }
    },
  all: ['cat', 'clear', 'cls', 'history', 'ls', 'man', 'source', 'time']
};

const commandManual = {
  cat: createManPage('cat', 'print the contents of the file to standard output', ['cat [FILE]']),
  clear: createManPage('clear', 'clear the terminal screen', ['clear']),
  cls: createManPage('cls', 'clear the terminal screen', ['cls']),
  history: createManPage('history', "view or clear the terminal's history", ['history', 'history -c']),
  ls: createManPage('ls', 'list directory contents', ['ls']),
  man: createManPage('man', 'an interface to the on-line reference manuals', ['man [COMMAND]']),
  source: createManPage('source', 'open the source for a given project in a new window', ['source', 'source [PROJ_NAME]']),
  time: createManPage('time', 'display the current time for this system', ['time']),
  search:
    function (command) {
      for (let c of commands.all) {
        if (c.toLowerCase() === command.toLowerCase()) {
          return this[command];
        }
      }
      return `No manual entry for ${command}`;
    }
};
