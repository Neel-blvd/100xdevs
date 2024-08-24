const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();

const todosFilePath = path.join(__dirname, 'todos.json');

// Load todos from file
const loadTodos = () => {
  if (fs.existsSync(todosFilePath)) {
    return JSON.parse(fs.readFileSync(todosFilePath, 'utf8'));
  }
  return [];
};

// Save todos to file
const saveTodos = (todos) => {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
};

// Command to add a todo
program
  .command('add <task>')
  .description('Add a new todo')
  .action((task) => {
    const todos = loadTodos();
    todos.push({ task, done: false });
    saveTodos(todos);
    console.log(`Added todo: "${task}"`);
  });

// Command to delete a todo
program
  .command('delete <task>')
  .description('Delete a todo')
  .action((task) => {
    let todos = loadTodos();
    todos = todos.filter(todo => todo.task !== task);
    saveTodos(todos);
    console.log(`Deleted todo: "${task}"`);
  });

// Command to mark a todo as done
program
  .command('do <task>')
  .description('Mark a todo as done')
  .action((task) => {
    const todos = loadTodos();
    const todo = todos.find(todo => todo.task === task);
    if (todo) {
        if(todo.done)
        {
            console.log('This task is already done')
            return
        }
      todo.done = true;
      saveTodos(todos);
      console.log(`Marked todo as done: "${task}"`);
    } else {
      console.log(`Todo not found: "${task}"`);
    }
  });


// Command to mark a todo as undone
program
  .command('undo <task>')
  .description('Mark a todo as undone')
  .action((task) => {
    const todos = loadTodos();
    const todo = todos.find(todo => todo.task === task);
    if (todo) {
        if(!todo.done)
        {
            console.log('This task is already undone');
            return;
        }
      todo.done = false;
      saveTodos(todos);
      console.log(`Marked todo as undone: "${task}"`);
    } else {
      console.log(`Todo not found: "${task}"`);
    }
  });


// Command to show all todo tasks
program
  .command('show')
  .description('Show all todo tasks')
  .action(() => {
    const todos = loadTodos();
    console.log(todos.map((todo) => {if(!todo.done) return todo.task}).filter((ele) => ele != undefined ))
  });

  



  program.on('--help', () => {
    console.log();
    console.log('Note:');
    console.log('   For multi-word tasks, put the multi-word task in quotes');
  });



program.parse();
