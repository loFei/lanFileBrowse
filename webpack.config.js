/** webpack配置 */
module.exports = (enviroment) => {
  let env = 'dev';
  let _DEV_ = true;
  let _PROD_ = false;

  switch (enviroment) {
   case 'dev':
     env = 'dev';
     _DEV_ = true;
     _PROD_ = false;
     break;
   case 'production':
     env = 'prod';
     _DEV_ = false;
     _PROD_ = true;
     break;
  }

  return require(`./webpack/${ env }.conf.js`)({
    ROOT_PATH: __dirname,
    _DEV_,
    _PROD_
  })
}