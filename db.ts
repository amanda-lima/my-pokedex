import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("my-pokedex.db");

export interface Pokemon {
  id?: string;
  name: string;
  nickname: string;
  comment: string;
}

export function initDatabase() {
  console.log("Inicializando banco de dados...")
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS pokemon (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, nickname TEXT, comment TEXT)"
    );
  });
}

export const createPokemon = (name: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM pokemon WHERE name = ?;",
      [name],
      (_, result) => {
        if (result.rows.length > 0) {
          console.log("Já existe um pokemon com esse nome.");
        } else {
          tx.executeSql(
            'INSERT INTO pokemon (name, nickname, comment) VALUES (?, "", "");',
            [name],
            (_, insertResult) => {
              console.log(
                "Novo pokemon criado com sucesso! ID:",
                insertResult.insertId
              );
            },
            (error) => {
              console.log("Erro ao criar novo pokemon:", error);
              return true;
            }
          );
        }
      },
      (error) => {
        console.log("Erro ao verificar a existência do pokemon:", error);
        return true;
      }
    );
  });
};

export const getPokemon = (name: string): Promise<any> => {
  console.log("Buscando pokemon...");
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM pokemon WHERE name = ?;",
          [name],
          (_, result) => {
            if (result.rows.length > 0) {
              const pokemon = result.rows.item(0);
              console.log("Pokemon encontrado:", pokemon);
              resolve(pokemon);
            } else {
              console.log("Pokemon não encontrado.");
              createPokemon(name);
              reject(new Error("Pokemon não encontrado"));
            }
          },
          (_, error) => {
            console.log("Erro ao buscar pokemon:", error);
            reject(error);
            return false;
          }
        );
      },
      (error) => {
        console.log("Erro ao buscar pokemon:", error);
        reject(error);
        return false;
      },
      () => {
        console.log("Busca de pokemon concluída com sucesso!");
      }
    );
  });
};


export const editPokemon = (
  name: string,
  nickname: string,
  comment: string
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE pokemon SET nickname = ?, comment = ? WHERE name = ?;",
      [nickname, comment, name],
      (_, result) => {
        if (result.rowsAffected > 0) {
          console.log("Pokemon editado com sucesso!");
        } else {
          console.log("Pokemon não encontrado.");
        }
      },
      (error) => {
        console.log("Erro ao editar pokemon:", error);
        return true;
      }
    );
  });
};