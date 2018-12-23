$(document).ready(function () {

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
      this.echo(commands.all.join('    '));
    }

    else if (command === 'man') {
      this.echo(commands.man_no_args);
    }

    else if (command.startsWith('man ')) {
      this.echo(commandManual.search(command.split(' ')[1]));
    }

    else if (command === 'source') {
      this.echo(commands.source());
    }

    else if (command.startsWith('source ')) {
      this.echo(commands.source(command.split(' ')[1]));
    }

    else if (command === 'history') {
      this.history().data()
        .toString()
        .split(',')
        .forEach((item, index) => this.echo(`${index + 1} ${item}`));
    }

    else if (command === 'history -c') {
      this.history().clear();
      this.echo('');
    }

    // The command was a comment so just ignore it
    else if (command.startsWith('#')) {
      this.echo('');
    }

    // The user only pressed enter so just show the cmd prompt
    else if (command.trim() === '') {
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