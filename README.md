# bug-report-app
Thank you for the interesting challenge.

I built some tests for the basic functionality of the application. The output is already in the test folder with images and an todo-test.txt file logging the operations

Limited in functionality, I worked to dispaly the different aspects I learnt of puppeteer docs that felt relevant to the application. 
Of course more can always be done and I am interested to find out more how to put together these tests for larger applications and how I could improve my current attempt.

many thanks,

H

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### To run tests, go to test/ folder then:

```
node emulate-devices.test.js > todo-test.txt ; node title-buttons.test.js >> todo-test.txt ; node add-todo.test.js >> todo-test.txt
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
