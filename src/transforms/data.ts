export const uberPackageToPackages: Map<string, string[]> = new Map([
  [
    '@fluid-experimental/fluid-framework',
    [
      '@fluid-experimental/fluid-static',
      '@fluidframework/cell',
      '@fluidframework/map',
      '@fluidframework/sequence',
    ],
  ],
]);

export const packagesToUberPackage = new Map<string, string>();
uberPackageToPackages.forEach((innerPackages, uberPackage) => {
  for (const innerPackage of innerPackages) {
    packagesToUberPackage.set(innerPackage, uberPackage);
  }
});

export const packagesToSpecifiers: Map<string, string[]> = new Map([
  [
    '@fluid-experimental/fluid-static',
    [
      'ContainerSchema',
      'DataObjectClass',
      'DOProviderContainerRuntimeFactory',
      'FluidContainer',
      'IConnection',
      'IFluidContainer',
      'IFluidContainerEvents',
      'IMember',
      'IRuntimeSignaler',
      'IServiceAudience',
      'IServiceAudienceEvents',
      'ISignaler',
      'LoadableObjectClass',
      'LoadableObjectClassRecord',
      'LoadableObjectCtor',
      'LoadableObjectRecord',
      'RootDataObject',
      'RootDataObjectProps',
      'ServiceAudience',
      'SharedObjectClass',
      'Signaler',
      'SignalListener',
      'SignalManager',
    ],
  ],
  [
    '@fluidframework/cell',
    [
      'ISharedCell',
      'ISharedCellEvents',
      'SharedCell'
    ]
  ],
  [
    '@fluidframework/common-definitions',
    [
      'ExtendEventProvider',
      'IDisposable',
      'IErrorEvent',
      'IEventProvider',
      'IEvent',
      'IEventTransformer',
      'IEventThisPlaceHolder',
      'ILoggingError',
      'ITaggedTelemetryPropertyType',
      'ITelemetryBaseEvent',
      'ITelemetryBaseLogger',
      'ITelemetryErrorEvent',
      'ITelemetryGenericEvent',
      'ITelemetryLogger',
      'ITelemetryPerformanceEvent',
      'ITelemetryProperties',
      'ReplaceIEventThisPlaceHolder',
      'TelemetryEventCategory',
      'TelemetryEventPropertyType',
      'TransformedEvent',
    ],
  ],
  [
    '@fluidframework/map',
    [
      'DirectoryFactory',
      'IDirectory',
      'IDirectoryDataObject',
      'IDirectoryEvents',
      'IDirectoryNewStorageFormat',
      'IDirectoryValueChanged',
      'ISerializableValue',
      'ISerializedValue',
      'ISharedDirectory',
      'ISharedDirectoryEvents',
      'ISharedMap',
      'ISharedMapEvents',
      'IValueChanged',
      'MapFactory',
      'SharedDirectory',
      'SharedMap',
    ],
  ],
  [
    '@fluidframework/sequence',
    [
      'DeserializeCallback',
      'IIntervalHelpers',
      'IJSONRunSegment',
      'Interval',
      'IntervalCollection',
      'IntervalCollectionIterator',
      'ISequenceDeltaRange',
      'ISerializableInterval',
      'ISerializedInterval',
      'ISharedIntervalCollection',
      'ISharedSegmentSequenceEvents',
      'ISharedString',
      'IValueOpEmitter',
      'MatrixSegment',
      'maxCellPosition',
      'maxCol',
      'maxCols',
      'maxRow',
      'maxRows',
      'PaddingSegment',
      'positionToRowCol',
      'rowColToPosition',
      'RunSegment',
      'SequenceDeltaEvent',
      'SequenceEvent',
      'SequenceInterval',
      'SequenceMaintenanceEvent',
      'SharedIntervalCollection',
      'SharedIntervalCollectionFactory',
      'SharedNumberSequence',
      'SharedNumberSequenceFactory',
      'SharedObjectSequence',
      'SharedObjectSequenceFactory',
      'SharedSegmentSequence',
      'SharedSequence',
      'SharedString',
      'SharedStringFactory',
      'SharedStringSegment',
      'SparseMatrix',
      'SparseMatrixFactory',
      'SparseMatrixItem',
      'SubSequence',
    ],
  ],
]);

export const specifiersToPackages = new Map<string, string>();
packagesToSpecifiers.forEach((specifiers, pkg) => {
  for (const specifier of specifiers) {
    specifiersToPackages.set(specifier, pkg);
  }
});

export const specifiersToUberPackage = new Map<string, string>();
packagesToSpecifiers.forEach((specifiers, pkg) => {
  for (const specifier of specifiers) {
    specifiersToUberPackage.set(specifier, packagesToUberPackage.get(pkg)!);
  }
});
