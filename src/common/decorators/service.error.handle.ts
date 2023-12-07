import { InternalServerErrorException } from '@nestjs/common';

export function ServiceErrorHandle (): MethodDecorator {

    return function decorator(
        target: any,
        _propertyKey: string,
        descriptor: PropertyDescriptor,
    ): void {
        const method = descriptor.value;

        descriptor.value = async function wrapper(...args: any[]) {
            try {
                return await method.apply(this, args);
            } catch (e) {
                console.log('Error:');
                console.dir(e);

                throw new InternalServerErrorException(e);
            }
        };
    };
}
