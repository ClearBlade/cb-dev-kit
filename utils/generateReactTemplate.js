module.exports = {
  generateJs: (name) => `import React from 'react';
import ReactDOM from 'react-dom';

class ${name} extends React.Component {
  render() {
    return (
      <div />
    );
  }
}

ReactDOM.render(<${name} />, document.getElementById('${name}-react-widget'));
export default ${name};`,
  generateHTML: (name) => `<div id='${name}-react-widget'></div>`
}
