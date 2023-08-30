from django import forms
from .models import UserBase

class RegistrationForm(forms.ModelForm):
    first_name = forms.CharField(
        min_length=3,
        max_length=50,
        help_text='Required',
        widget=forms.TextInput(attrs={'placeholder': 'First Name'})
    )
    last_name = forms.CharField(
        min_length=3,
        max_length=50,
        help_text='Required',
        widget=forms.TextInput(attrs={'placeholder': 'Last Name'})
    )
    email = forms.EmailField(
        max_length=100,
        help_text='Required',
        error_messages={
            'required': 'You need to type an Email'
        },
        widget=forms.EmailInput(attrs={'placeholder': 'Email'})
    )
    phone = forms.CharField(
        max_length=15,  # Change the max_length as per your phone number format
        help_text='Required',
        widget=forms.TextInput(attrs={'placeholder': 'Phone Number'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password'})
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password'})
    )

    class Meta:
        model = UserBase
        fields = ('first_name', 'last_name', 'email')

    def as_table(self):
        # Override the as_table method to remove labels and <br> tags
        return self._html_output(
            normal_row='<span%(html_class_attr)s>%(field)s%(help_text)s</span>',
            error_row='%s',
            row_ender='',
            help_text_html=' <span class="helptext">%s</span>',
            errors_on_separate_row=False,
        )