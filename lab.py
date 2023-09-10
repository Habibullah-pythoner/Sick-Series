import time
import uuid
import random

def generate_unique_id():
    # Get current timestamp in milliseconds
    timestamp_ms = int(time.time() * 1000)

    # Generate a random number between 0 and 9999 (adjust range as needed)
    random_number = random.randint(0, 9999)

    # Generate a UUID and extract the first 8 characters
    uuid_part = str(uuid.uuid4())[:8]

    # Concatenate the timestamp, random number, and UUID
    unique_id = f"{timestamp_ms}{random_number}{uuid_part}"

    return unique_id

# Example usage:
unique_id = generate_unique_id()
print(unique_id)