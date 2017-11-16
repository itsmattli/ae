<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">


    <title>@yield('pageTitle')</title>

    <!-- Styles -->
    @yield('css')
</head>
<body>
<div id="app">
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'aequilibrium') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        <li><a href="/castles">Castles</a></li>
                        <li><a href="/transformers">Transformer</a></li>
                    </ul>
                </div>
            </div>
        </nav>
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
