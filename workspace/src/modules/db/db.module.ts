import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [],
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGODB_URI;
        console.log(`MongoDB URL=${process.env.MONGODB_URI}`);
        return {
          uri, //: 'mongodb://localhost:27017/mydatabase', // Replace with your DB connection string
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
  exports: [MongooseModule]
})
export class DbModule {}
