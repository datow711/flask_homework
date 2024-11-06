"""題目：台語喊親戚（Python 實作）
說明：根據親戚關係 CSV 檔案，實作判斷其稱謂的程式。

檔案：relatives_taiwanese.csv

輸入：您與某位親戚的關係路徑

如：姊->夫->父（姊姊的丈夫的父親）。

例一：父、母、父->外曾祖父、阿祖、a-tsóo, tsa-poo-tsóo
例二：父、母、母->外曾祖母、阿祖、a-tsóo, tsa-bóo-tsóo

輸出：該親戚的中文、台語漢字、台羅稱謂（同時輸出三個）
如：親家公、親家公、tshin-ke-kong"""

import csv

FILE_PATH = "relatives_taiwanese.csv"


relatives = {}
with open(FILE_PATH, 'r', encoding='utf-8') as file:
    reader = csv.reader(file)
    next(reader)  # 跳過標題行
    for row in reader:
        key = tuple(row[:3])
        value = tuple(row[3:])
        relatives[key] = value


def find_relative(path, relatives=relatives):
    key = tuple(path + ['無'] * (3 - len(path))) #用 '無' 補足較短的路徑
    return relatives.get(key, ('未知', '未知', '未知'))