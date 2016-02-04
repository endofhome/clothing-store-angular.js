exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['clothingStoreAngularFeature.js'],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
}