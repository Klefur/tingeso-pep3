import csv
import os

def csv_to_sql(csv_file):
    table_name = os.path.splitext(os.path.basename(csv_file))[0]

    with open(csv_file, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        fields = csv_reader.fieldnames

        insert_data_query = f"INSERT INTO {table_name} ({', '.join(fields)}) VALUES\n"

        cambia = '\''
        cambiado = '\'\''
        for row in csv_reader:
            values = []
            for value in row.values():
                if "'" in value:
                    value = value.replace(cambia, cambiado)
                # Revisa si el valor es un número y cámbialo a int
                if value.isdigit():
                    values.append(value)
                else:
                    values.append(f"'{value}'")

            insert_data_query += f"({', '.join(values)}),\n"

        insert_data_query = insert_data_query[:-2] + ";\n"

    return insert_data_query


def generate_sql_from_csv_files(csv_directory, output_sql_file):
    with open(output_sql_file, 'w', encoding='utf-8') as sql_file:
        for csv_file in os.listdir(csv_directory):
            if csv_file.endswith(".csv"):
                csv_path = os.path.join(csv_directory, csv_file)
                sql_content = csv_to_sql(csv_path)
                sql_file.write(sql_content)

if __name__ == "__main__":
    csv_directory = "./"
    output_sql_file = "./data.sql"
    generate_sql_from_csv_files(csv_directory, output_sql_file)
