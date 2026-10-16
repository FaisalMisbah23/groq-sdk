# Groq SDK exists test

import pytest
from groq_sdk import GroqSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GroqSDK.test(None, None)
        assert testsdk is not None
