var NeuralNetwork = function () {
  this.n = 40;
  this.learningRate = 0.01;

  this.synone = [];
  for (var i = 0; i < 3; ++i) {
    this.synone[i] = [];
    for (var j = 0; j < this.n; ++j) {
      this.synone[i][j] = Math.random() * 0.1;
    }
  }

  this.syntwo = [];
  for (var i = 0; i < this.n; ++i) {
    this.syntwo[i] = [];
    for (var j = 0; j < 2; ++j) {
      this.syntwo[i][j] = Math.random() * 0.1;
    }
  }

  this.input = [0, 0, 2];
  this.output = [0, 0];
  this.medin = [];
  this.medout = [];
};

NeuralNetwork.prototype.compute = function (a, b) {
  this.input[0] = a;
  this.input[1] = b;

  for (var i = 0; i < this.n; ++i) {
    this.medin[i] = 0;
    for (var j = 0; j < 3; ++j) {
      this.medin[i] += this.synone[j][i] * this.input[j];
    }
    this.medout[i] = Math.tanh(this.medin[i]);
  }

  for (var i = 0; i < 2; ++i) {
    this.output[i] = 0;
    for (var j = 0; j < this.n; ++j) {
      this.output[i] += this.syntwo[j][i] * this.medout[j];
    }
  }
};

NeuralNetwork.prototype.learn = function (a, b) {
  var target = [a, b];
  var error = [];

  for (var i = 0; i < 2; ++i) {
    error[i] = target[i] - this.output[i];
  }

  for (var i = 0; i < 2; ++i) {
    for (var j = 0; j < this.n; ++j) {
      this.syntwo[j][i] += this.learningRate * this.medout[j] * error[i];
    }
  }

  var sigma = [];
  var sigmoid = [];
  for (var i = 0; i < this.n; ++i) {
    sigma[i] = 0;
    for (var j = 0; j < 2; ++j) {
      sigma[i] += error[j] * this.syntwo[i][j];
    }
    sigmoid[i] = 1 - (this.medout[i] * this.medout[i]);
  }

  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < this.n; ++j) {
      var delta = this.learningRate * sigmoid[j] * sigma[j] * this.input[i];
      this.synone[i][j] += delta;
    }
  }
};
