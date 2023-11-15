import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableMovies1699664693540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "movies",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "year",
                        type: "number",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "studios",
                        type: "varchar",
                    },
                    {
                        name: "producers",
                        type: "varchar",
                    },
                    {
                        name: "winner",
                        type: "boolean",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movies");
    }

}
