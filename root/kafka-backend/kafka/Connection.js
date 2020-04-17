var kafka = require('kafka-node');
var {KAFKA_HOST_URL} = require('./Kafka-config');

function ConnectionProvider() {

    this.getClient = function () {
        this.client = new kafka.KafkaClient({kafkaHost:"localhost:9092"});
        return  this.client;
    };

    this.getConsumer = function (topic_name) {
        this.client = new kafka.KafkaClient({kafkaHost:"localhost:9092"});
        this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{ topic: topic_name, partition: 0 }]);
        this.client.on('ready', function () { console.log('client ready!') })

        return this.kafkaConsumerConnection;
    };

    this.getProducer = function () {

        if (!this.kafkaProducerConnection) {
            // this.client = new kafka.Client("localhost:2181");
            this.client = new kafka.KafkaClient({kafkaHost:"localhost:9092"});
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}

exports = module.exports = new ConnectionProvider;