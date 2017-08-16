#!/bin/bash
zip -r $1/hybrid.zip $1/hybrid/DeploymentManifest.xml $1/hybrid/pods $1/hybrid/services -x "*.DS_Store"