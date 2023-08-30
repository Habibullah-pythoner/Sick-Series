def highlight(str, searched):
    start = str.lower().find(searched.lower())
    end = start + len(searched)

    substring_to_insert = "<span>"

    new_string = str[:start] + substring_to_insert + str[start:end] + "<span>" + str[end:]
    return new_string


print(highlight("SICK HOODIE \"FABIO WIBMER SPECIAL EDITION", "ho"))