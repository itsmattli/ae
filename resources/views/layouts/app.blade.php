<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">


    <title>@yield('pageTitle')</title>

    <!-- Styles -->
    @yield('css')
</head>
<body>
<div id="app">
    <div id="wrapper">
    @yield('content')
    <!-- Footer -->
        <footer id="footer">
            <div class="inner">
                <ul class="icons">
                    <li><a href="https://instagram.com/itsmattli" class="icon alt fa-instagram"><span class="label">Instagram</span></a></li>
                    <li><a href="https://github.com/itsmattli" class="icon alt fa-github"><span class="label">GitHub</span></a></li>
                    <li><a href="https://www.linkedin.com/in/itsmattli" class="icon alt fa-linkedin"><span class="label">LinkedIn</span></a></li>
                </ul>
            </div>
        </footer>
    </div>
</div>


<script src="{{ mix('js/app.js') }}"></script>


@yield('scripts')
</body>
</html>
