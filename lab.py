import locale
def format_number_with_commas(number):
    locale.setlocale(locale.LC_ALL, '')  # Set the locale to the default for your system
    formatted_number = locale.format_string('%d', number, grouping=True)
    return formatted_number

print(format_number_with_commas(1212711))