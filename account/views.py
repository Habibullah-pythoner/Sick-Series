from django.shortcuts import render
from .forms import RegistrationForm
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.contrib.auth import logout

from django.contrib import messages

def underwork(request):
    return render(request, 'user/underwork.html')

def register(request):
    if request.method == 'POST':
        registerForm = RegistrationForm(request.POST)

        if registerForm.is_valid():
            user = registerForm.save(commit=False)
            user.email = registerForm.cleaned_data['email']
            user.set_password(registerForm.cleaned_data['password'])
            user.is_active = False
            user.save()

            # Setup Email
            current_site = get_current_site(request)
            subject = 'Activate Your Account'
            message = render_to_string('account/registration/account_activation_email.html',{
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            user.email_user(subject=subject, message=message)

    else:
        registerForm = RegistrationForm()
        return render(request, 'account/registration/register.html', {'form': registerForm})

def sign_out(request):
    # Logout the user
    logout(request)
    
    # Redirect to a specific page after logout (change this URL to your desired destination)
    return redirect('/')

def custom_login(request):
    if request.method == 'POST':
        username = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Redirect to a specific page after successful login
            return redirect('/')  # Replace 'dashboard' with your desired URL
        else:
            print('Invalid username or password.')
    else:
        return render(request, 'account/login/login.html')

def account(request):
    return render(request, 'account/account.html')
