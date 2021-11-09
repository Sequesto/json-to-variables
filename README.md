# JSON to variables
This action reads json file and writes its content as environment variables.

## Inputs

### `filename`

**Required** The JSON file.

## Usage

### File content 
```json
{
    "value": "value",
    "array": [
        {
            "value": "value 0"
        },
        "value 1"
    ],
    "obj": {
        "value1": "value1",
        "value2": "value2"
    }
}
```

### YML example 
```yml
- name: JSON to variables
  uses: antifree/json-to-variables@v1.0.1
  with:
    filename: 'test.json'
- name: Show output
  run: echo "The time was ${{ env.value }}, ${{ env.array_0_value }}, ${{ env.obj_value1 }}"
```
