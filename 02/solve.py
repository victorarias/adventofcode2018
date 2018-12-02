from collections import Counter

with open("02/data") as f:
    official_lines = f.readlines()

with open("02/test_data_1") as f:
    test1_lines = f.readlines()

with open("02/test_data_2") as f:
    test2_lines = f.readlines()

def assertEquals(actual, expected):
    assert actual == expected, f"expected {expected}, got {actual}"

def solvePart1(lines):
    n_of_2 = 0
    n_of_3 = 0

    for line in lines:
        line = line.rstrip()
        counts = Counter(line).values()

        if 2 in counts:
            n_of_2 += 1

        if 3 in counts:
            n_of_3 += 1

    return n_of_2 * n_of_3

assertEquals(solvePart1(test1_lines), 12)

def detectCorrectId(str1, str2):
    without_differences = [a for (a, b) in zip(str1, str2) if a == b]

    if (len(without_differences) == len(str1) - 1):
        return "".join(without_differences)

def solvePart2(lines):
    i = 0
    j = 1

    while i < len(lines):
        while j < len(lines):
            if (i == j):
                j += 1
                continue

            correctId = detectCorrectId(lines[i].strip(), lines[j].strip())
            if (correctId):
                return correctId
            else:
                j += 1
        i += 1
        j = 0

    return None

assertEquals(solvePart2(test2_lines), "fgij")
print(solvePart2(official_lines))
