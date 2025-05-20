import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRole } from 'src/const';
import { DataSource } from 'typeorm';

@Injectable()
export class UserSeeder implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit(): Promise<void> {
    const usernames = ['user1', 'user2', 'admin'];
    const existingUsers = await this.dataSource.query(
      `SELECT username FROM users WHERE username IN (?)`,
      [usernames],
    );

    const existingUsernames = new Set(existingUsers.map((u) => u.username));
    const usersToInsert = usernames.filter((u) => !existingUsernames.has(u));

    if (usersToInsert.length === 0) return;

    const values = usersToInsert.map((u, i) => {
      const id = `${i + 5}24d47f7-2659-483a-adfc-14ed353f30${95 + i}`;
      const role = u === 'admin' ? UserRole.ADMIN : UserRole.USER;
      return `('${id}', '${u}', 'x', '${role}', NOW())`;
    });

    const sql = `
      INSERT INTO users (id, username, password, role, created_at)
      VALUES ${values.join(', ')};
    `;

    await this.dataSource.query(sql);
    console.log('✅ Seeded users:', usersToInsert);
  }
}
