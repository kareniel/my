var resources = {
  download: require('./resources/download'),
  upload: require('./resources/upload'),
  session: require('./resources/session'),
  usage: require('./resources/usage'),
  user: require('./resources/user')
}

function VibedriveAPI () {
  if (!(this instanceof VibedriveAPI)) return new VibedriveAPI()

  this.headers = { 'Authorization': '' }
  this.apiURL = process.env.API_URL || 'https://localhost:5823'

  this._prepResources()
}

VibedriveAPI.prototype._prepResources = function () {
  for (var key in resources) {
    if (resources.hasOwnProperty(key)) {
      var resource = resources[key]
      this[key] = resource(this)
    }
  }
}

module.exports = VibedriveAPI()
