$(document).ready(function () {

  const projects = {
    projects: [
      {
        name: 'Tweety-Android',
        description: 'An android app that tracks keywords from Twitter in real time (she said WHAT?!?)',
        languages: ['Java', 'Kotlin']
      },
      {
        name: 'AlexaClassScheduler',
        description: 'An Alexa skill that remembers your classes for you (adios calendars).',
        languages: ['Python', 'Kotlin']
      },
      {
        name: 'UCFParking',
        description: "An app that shows how full each parking garage is (pro-tip, don't park past 11AM)",
        languages: ['Kotlin']
      }
    ]
  };

  const commands = {
    ls: ['about.txt', 'contact.txt', 'languages.txt', 'projects.json', 'README.md'],
    error_msg: (command) => `${command}: command not found`,
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
    projects: () => JSON.stringify(JSON.parse(JSON.stringify(projects)), null, 2),
    readme:
      'Welcome to my site! Type `help` to see an available list of commands.\n' +
      "Might I recommend running `cat about.txt`?\n" +
      "Oh, how about `ls`? That's a good one too!\n",
    cat: function (file_name) {

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
    cmds: ['cat', 'clear', 'cls', 'ls', 'time']
  };

  $('.t').terminal(function (command) {
    if (command === 'ls') {
      this.echo(commands.ls.join('    '));

    } else if (command === 'cat') {
      this.echo(commands.cat(''));
    }

    else if (command.startsWith('cat ')) {
      this.echo(commands.cat(command.split(' ')[1]));

    } else if (command === 'cls' || command === 'clear') {
      this.clear();
    }

    else if (command === 'time') {
      this.echo(commands.time())
    }

    else if (command === 'help') {
      this.echo(commands.cmds.join('    '));
    }

    else if (command === '') {
      this.echo('');
    }
    else {
      this.echo(commands.error_msg(command))
    }

    // Makes sure to scroll to the bottom when a command is sent
    window.scrollTo(0, document.body.scrollHeight);
  }, {
    greetings: 'LintOS Linux release 7.6.1337 (Core)\n',
    name: 'term',
    prompt: "[[;#51d040;]ctcuff@github][[;#FFF;]:][[;#8195e0;]~/projects/website][[;#FFF;]$] ",
  });

  $.terminal.active().echo(commands.readme);
});




