const tf = require('@tensorflow/tfjs-node');

const CardiacArrestPrediction = {
  model: null,

  loadModel: async function() {
    try {
      this.model = await tf.loadLayersModel('file://./model/model.json');
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading the model:', error);
      throw error;
    }
  },

  predict: async function(inputData) {
    if (!this.model) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }

    try {
      const inputTensor = tf.tensor2d([inputData]);
      const predictions = await this.model.predict(inputTensor);
      return predictions.dataSync();
    } catch (error) {
      console.error('Error predicting with the model:', error);
      throw error;
    }
  }
};

module.exports = CardiacArrestPrediction;