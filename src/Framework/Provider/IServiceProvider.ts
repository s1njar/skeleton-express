/**
 * @interface IServiceProvider
 */
export interface IServiceProvider {
    /**
     * Register new service.
     */
    register(): Promise<void>;
}