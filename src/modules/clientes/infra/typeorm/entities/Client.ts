
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '../../../../../config/upload';

@Entity('clients')
export default class Clients {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    cpf: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null{

        if(!this.avatar){
            return null;
        }

        switch (uploadConfig.driver){
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}` ;

            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
            default:
                return null;

        }
    }

}


