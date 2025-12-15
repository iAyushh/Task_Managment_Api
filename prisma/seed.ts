import { PrismaClient, Role, TaskStatus } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { title } from "process";


const prisma = new PrismaClient();

async function main () {
   const adminPassword = await bcrypt.hash('admin123', 10);
   const userPassword = await bcrypt.hash('user123', 10);
   
   const admin = await prisma.user.upsert({
    where: {username: 'admin'},
    update: {},
    create:{
        username: 'admin',
        password: adminPassword,
        role: Role.ADMIN
    },
   });

   const user = await prisma.user.upsert({
    where: {username: 'user'},
    update: {},
    create:{
        username: 'user',
        password: userPassword,
        role: Role.USER
    }
   })

   await prisma.task.createMany({
        data:[
            {
                title: 'Setup Project',
                description: 'Initialize Nest js and Prisma',
                status: TaskStatus.PENDING,
                userId: admin.id,
            },

            {
                title: "Implement Auth",
                description: "Jwt + Roles",
                status:TaskStatus.IN_PROGRESS,
                userId: admin.id,
            },

           { title: "Configure Database",
            description: "Postgre + Prisma",
            status: TaskStatus.IN_PROGRESS,
            userId: user.id,}
        ]
   });
}
main().catch(console.error).finally(()=>prisma.$disconnect());