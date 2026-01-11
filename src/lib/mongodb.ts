import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// ❌ 删除了原来写在这里的报错代码
// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

// 为了解决 TypeScript 报错和热重载问题，给 global 加上类型断言
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // ✅ 核心修改：把检查移到这里面！
  // 只有当 API 真正被调用（运行时）才会检查
  // 这样 Docker 构建（Build时）就不会因为缺环境变量而报错了
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
