const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://abelgryta:${process.env.PASSWORD_MONGODB_CONFIG}@cluster0.9julpb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


if (!uri) {
  throw new Error(`ga connect bos!`);
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db("gc2");
