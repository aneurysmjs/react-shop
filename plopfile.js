const components = './src/app/components';

const isFunctional = componentType => componentType === 'functional';

module.exports = function(plop) {
  plop.setGenerator('React Component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'prompt',
        name: 'componentName',
        message: 'Name of your component:',
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'Choose component\'s type',
        choices: [
          'class',
          'functional',
        ]
      },
      {
        type: 'confirm',
        name: 'connectToRedux',
        message: 'Do you want the component to be connected to Redux?',
        default: false,
        when: ({ componentType }) => !isFunctional(componentType),
      },
    ],
    actions({ componentType }) {
      const prefix = isFunctional(componentType) ? 'functional-' : 'class-';

      const actions = [
        {
          type: 'add',
          path: `${components}/shared/{{properCase componentName}}/{{properCase componentName}}.js`,
          templateFile: `./config/plop/component/${prefix}component.js.plop`,
        },
        {
          type: 'add',
          path: `${components}/shared/{{properCase componentName}}/{{properCase componentName}}.scss`,
          templateFile: './config/plop/component/component.scss.plop',
        },
        {
          type: 'add',
          path: `${components}/shared/{{properCase componentName}}/{{properCase componentName}}.test.js`,
          templateFile: './config/plop/component/component.test.js.plop',
        },
      ];

      return actions;
    },
  });

};
