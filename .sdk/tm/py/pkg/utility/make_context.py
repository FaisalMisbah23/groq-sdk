# Groq SDK utility: make_context

from projectname_sdk.core.context import GroqContext


def make_context_util(ctxmap, basectx):
    return GroqContext(ctxmap, basectx)
