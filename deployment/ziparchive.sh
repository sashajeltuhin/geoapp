#!/bin/bash
cd $1/hybrid
zip -r hybrid.zip DeploymentManifest.xml pods services -x "*.DS_Store"