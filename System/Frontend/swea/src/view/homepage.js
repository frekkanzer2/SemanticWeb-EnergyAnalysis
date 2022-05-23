import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function Tester(props) {
    return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained" onClick={test}>Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
    );
}

function test() {
    console.log("BLA BLA BLA");
}