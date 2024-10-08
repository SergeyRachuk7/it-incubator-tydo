// import type { StorybookConfig } from "@storybook/react-webpack5";

// const config: StorybookConfig = {
//   stories: ["../src/**/*.mdx", "../src/**/*.stories.tsx"],   
//   addons: [
//     "@storybook/preset-create-react-app",
//     "@storybook/addon-onboarding",
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@chromatic-com/storybook",
//     "@storybook/addon-interactions",
//   ],
//   framework: {
//     name: "@storybook/react-webpack5",
//     options: {},
//   },
//   staticDirs: ["..\\public"],
// };
// export default config;
 


// module.exports = {
//   stories: ["../src/**/*.stories.tsx"],
//   addons: [
//     "@storybook/preset-create-react-app",
//     "@storybook/addon-actions",
//     "@storybook/addon-links",
//     { 
//       name: '@storybook/addon-storysource',
//       options: {
//         rule: {
//           test: [/\.stories\.tsx$/],
//         },
//         loaderOptions: {
//           prettierConfig: {
//             printWidth: 80,
//             singleQuote: false,
//             options: {parser: 'typescript'}                          
//           }
//         }
//       }
//     }
//   ],
// };


// module.exports = {
//   stories: ["../src/**/*.stories.tsx"],
//   addons: [
//     "@storybook/preset-create-react-app",
//     "@storybook/addon-actions",
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions",
//   ],
//   framework: {
//     name: "@storybook/react-webpack5",
//     options: {}, 
//   },
// }; 


// module.exports = {
//   stories: ["../src/**/*.stories.tsx"],
//   addons: [
//     "@storybook/preset-create-react-app",
//     "@storybook/addon-actions",
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions",
//   ],
//   framework: {
//     name: "@storybook/react-webpack5",
//       options: {
//         rule: {
//           test: [/\.stories\.tsx$/],
//         },
//         loaderOptions: {
//           prettierConfig: {
//             printWidth: 80,
//             singleQuote: false,
//             options: {parser: 'typescript'}                          
//           } 
//          }
//       }, 
//   }, 
// }; 


module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.stories\.tsx$/],
        },
        loaderOptions: {
          prettierConfig: {
            printWidth: 80,
            singleQuote: false,
            options: { parser: 'typescript' }
          }
        }
      }
    }
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};
