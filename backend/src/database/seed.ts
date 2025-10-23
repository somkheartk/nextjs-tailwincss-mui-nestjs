import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Check if admin user already exists
    const existingAdmin = await usersService.findByEmail('admin@example.com');
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      await app.close();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminUser = await usersService.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    console.log('Please change this password after first login!');

    // Create a demo user
    const demoPassword = await bcrypt.hash('demo123', 10);
    await usersService.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: demoPassword,
      role: 'user',
      isActive: true,
    });

    console.log('\nDemo user created:');
    console.log('Email: demo@example.com');
    console.log('Password: demo123');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
