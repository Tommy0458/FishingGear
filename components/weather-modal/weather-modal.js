Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    cityName: {
      type: String,
      value: ''
    },
    weatherData: {
      type: Object,
      value: {}
    },
    sunsetTime: {
      type: String,
      value: ''
    },
    pressure: {
      type: String,
      value: ''
    }
  },
  
  methods: {
    closeModal() {
      this.setData({
        visible: false
      });
      this.triggerEvent('close');
    }
  }
});