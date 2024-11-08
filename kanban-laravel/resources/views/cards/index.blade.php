<!DOCTYPE html>
<html>

<head>
    <title>All Cards</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>

<body>
    <h1>All Cards</h1>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Column</th>
            </tr>
        </thead>
        <tbody>
            @foreach($cards as $card)
            <tr>
                <td>{{ $card->id }}</td>
                <td>{{ $card->title }}</td>
                <td>{{ $card->column }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>