#!/bin/bash
sed -ri 's/^(\s*)(\s*<<image-tag>>\s*$)/\1'"$2"'/' $1
