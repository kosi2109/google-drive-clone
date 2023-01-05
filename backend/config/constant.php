<?php

return [
    'permission_types' => [
        'viewer' => 1,
        'commenter' => 1,
        'editor' => 1
    ],
    'accesses' => [
        'public' => 1,
        'restricted' => 2
    ],
    'process_types' => [
        'add' => 1,
        'view' => 1,
        'update' => 3,
        'delete' => 4
    ],
    'process_names' => [
        'folder' => 'folder',
        'file' => 'file'
    ]
];