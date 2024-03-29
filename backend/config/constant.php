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
        'view' => 2,
        'update' => 3,
        'delete' => 4,
        'delete_permanent' => 5,
    ],
    'process_names' => [
        'folder' => 'folder',
        'file' => 'file'
    ]
];